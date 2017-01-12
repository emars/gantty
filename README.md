# Gantty

## Overview

Gantty is a gantt chart application that allows users to easily.

The application is written using Ruby on Rails + React.

The GanttChart component is written using D3.js with no external dependencies.

## Hosting

It is currently being hosted on a Heroku free tier instance using a postgresql free tier database.

https://gantty-app.herokuapp.com

## Features

- drag left side of bar to extend start date
- drag right side of bar to extend end date
- drag middle of bar to move start + end date
- drag + drop with snap to grid functionality
- ensures tasks are within the project bounds
- ensures tasks can't be less than 1 hour

## Limitations

- tasks must be minimum 1 hour
- tasks must be in 1 hour increments
- projects can't be longer than a week
- projects must be at least one day

## Dependencies

### Gems

`react_on_rails` for easily passing data from controllers to react components and handling node.js dependencies
`pg` used for hosting with heroku
`capybara-rails`
`rspec-rails` used for testing
`factory_girl_rails` used for defining factories for testing
`bootstrap` added the bootstrap v4 css

### Node Modules

`d3` for creating custom interactive charts
`react` for managing client side state + adding interactivity

## Assumptions

- Project Start + End are Date objects
- Increments are 30 minute intervals

- ProjectBar should not be 

## Methodology

Use Rails where possible, easier to test and think about.

Used Rails validators wherever possible as they provide a easy way to reason about valid data entering the database.

Only used React where interactivity is important (GanttChart, Save Button).

## Testing

I wrote features specs for the happy path through the application.

`rails test`

## Notes

Originally tried to use the google charts Gantt library, didn't have the functionality I needed (namely for interactivity). Needed to have more low level control over the chart.

Decided to use d3.js

## Licence

MIT
