# Gantt Application

Originally tried to use the google charts Gantt library, didn't have the functionality I needed (namely for interactivity). Needed to have more low level control over the chart.

Decided to use d3.js

## Assumptions

- Project Start + End are Date objects
- Increments are 30 minute intervals

- ProjectBar should not be 

## Methodology

Use Rails where possible, easier to test and think about.

Only used React where interactivity is important (GanttChart, Save Button).

## Testing

Only tested the 'Happy Path'

Used Rspec + Capybara

`rails test`
