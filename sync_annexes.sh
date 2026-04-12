#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
MANIFEST="$SCRIPT_DIR/annexes_manifest.tsv"
ANNEX_DIR="$SCRIPT_DIR/annexes"
JS_OUT="$SCRIPT_DIR/assets/annexes.js"

mkdir -p "$ANNEX_DIR"
find "$ANNEX_DIR" -type f -delete

{
  echo "window.ANNEXES_DATA = ["
  first=1

  tail -n +2 "$MANIFEST" | while IFS=$'\t' read -r annex_id week type title source_path target_filename description; do
    [[ -z "${annex_id:-}" ]] && continue
    src="$ROOT_DIR/$source_path"
    dst="$ANNEX_DIR/$target_filename"

    if [[ -f "$src" ]]; then
      cp -f "$src" "$dst"
      echo "Synced $annex_id -> annexes/$target_filename" >&2
    else
      echo "Warning: missing source for $annex_id: $source_path" >&2
      continue
    fi

    esc_title=${title//\"/\\\"}
    esc_desc=${description//\"/\\\"}
    esc_src=${source_path//\"/\\\"}
    esc_file="annexes/${target_filename//\"/\\\"}"
    esc_type=${type//\"/\\\"}

    if [[ $first -eq 0 ]]; then
      echo ","
    fi
    first=0
    printf '  {"id":"%s","week":%s,"type":"%s","title":"%s","description":"%s","source":"%s","file":"%s"}' \
      "$annex_id" "$week" "$esc_type" "$esc_title" "$esc_desc" "$esc_src" "$esc_file"
  done

  echo
  echo "];"
} > "$JS_OUT"

echo "Generated: $JS_OUT"
