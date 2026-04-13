# Week 11 Deliverable — Upstream (François)

## 1) Upstream challenge statement
**How might we better predict the length of stay and improve communication with patients about their care pathway, in order to anticipate hospital discharge earlier and more accurately?**

This upstream challenge focuses on reducing uncertainty before discharge by combining better anticipation with clearer patient communication.

## 2) Why this ideation method
For this sub-problem, I used **Morphological Analysis (Morphological Matrix)** because it is a structured ideation method that:
- fits the **diverge then converge** logic from the course ideation framework,
- allows rapid generation of many realistic combinations,
- is well adapted to a systems-oriented/engineering approach.

This method is presented in our course material (`W7 Ideation`) as a structured way to explore solution spaces by combining key dimensions of a problem.

## 3) Ideation setup (Morphological Matrix)
I explored combinations across four dimensions:

1. **Inputs for anticipation:** historical LOS, diagnosis/procedure type, social discharge constraints  
2. **Prediction approach:** simple rules, risk score, advanced ML  
3. **Communication channel:** nurse script, printed pathway sheet, SMS reminder  
4. **Update timing:** admission, D-2, D-1, day of discharge

This produced multiple candidate concepts, then narrowed down through DFV scoring.

## 4) Convergence with DFV
| Concept | Desirable | Feasible | Viable | Total |
|---|---:|---:|---:|---:|
| A. Simple LOS score + confidence level | 4 | 5 | 5 | **14** |
| B. Advanced ML prediction model | 3 | 2 | 2 | 7 |
| C. Discharge checklist from admission | 4 | 5 | 4 | 13 |
| D. Automated SMS communication journey | 4 | 3 | 3 | 10 |
| E. Shared unit dashboard for expected discharges | 5 | 4 | 4 | 13 |
| F. Daily 10-minute discharge huddle | 4 | 5 | 5 | **14** |

**Pivot decision:** Replace concept B (advanced ML, low feasibility/viability now) with a lighter and deployable alternative: concept A (simple score + confidence + daily update).

## 5) Final upstream concept
### **Early Discharge Forecast & Communication Bundle**
Three integrated components:

1. **Early forecast at admission:** estimated discharge date + confidence level.  
2. **Daily update ritual:** short team huddle to confirm/adjust expected discharges.  
3. **Standardized patient communication:** clear milestone updates on expected pathway (D-2, D-1, discharge day).

## 6) Why this concept is robust
- **Desirable:** improves visibility for teams and transparency for patients/families.  
- **Feasible:** low technical burden, compatible with current operations.  
- **Viable:** limited implementation cost, scalable unit by unit.

## 7) Risks and mitigation
- **Risk:** low team adoption.  
  **Mitigation:** one owner per unit + fixed 10-minute daily ritual.
- **Risk:** prediction errors.  
  **Mitigation:** confidence levels + mandatory daily reassessment.
- **Risk:** communication inconsistency.  
  **Mitigation:** standard communication template for all units.

## 8) Expected impact (KPIs)
- Improved discharge date prediction accuracy.  
- Higher share of patients informed at least 24h in advance.  
- Fewer last-minute discharge delays and reduced bed-flow friction.

## 9) Prototype developed (how, why, and goal)
To move from concept to action, I developed a small prototype stack in Python + web:

- **`los_forecast.py`**: a lightweight LOS prediction engine with a confidence level and an early-coordination flag.  
- **`daily_huddle_board.py`**: an operational board generator to support daily team alignment around expected discharges and blockers.  
- **`communication_flow.py`**: a D-2 / D-1 / D0 communication scheduler to standardize patient updates.  
- **Web demo (`index.html`)**: an interactive interface to present the logic and discuss decisions with non-technical stakeholders.

### How it was developed
The prototype was built iteratively from the selected upstream concept:
1. define simple and explainable prediction rules,  
2. transform output into operational decision support (huddle board),  
3. connect prediction to patient communication milestones,  
4. package the result in a publishable web demo for team reviews.

### Why this prototype
This approach was chosen to remain realistic in the current project scope:
- no heavy infrastructure,
- transparent logic for clinical discussion,
- fast iteration cycles for group feedback.

### Goal of the prototype
The goal is not to deliver a final hospital system, but to provide a **credible proof of feasibility** for the upstream strategy:
- anticipate discharge earlier,
- improve coordination before the discharge day,
- improve communication consistency with patients.

---

## Slide-ready short version (3 slides)

### Slide 1 — Upstream Problem
- Challenge: predict LOS earlier and communicate discharge pathway more clearly.  
- Goal: reduce uncertainty and last-minute discharge delays.

### Slide 2 — Method and Convergence
- Ideation method: **Morphological Matrix** (course-aligned, structured exploration).  
- Divergence on 4 dimensions, then DFV scoring.  
- Top options: A, F, E. Pivot from advanced ML to deployable rule-based scoring.

### Slide 3 — Final Upstream Concept
- **Early Discharge Forecast & Communication Bundle**  
  - admission forecast + confidence,  
  - daily discharge huddle,  
  - standardized patient updates.  
- Value: practical, scalable, and immediately testable in one pilot unit.
