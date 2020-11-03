# Parametric Padlock
A little idea for a parametric padlock svg.

## `withSettings`
Project also include a `withSettings` higher order component that is a re-usable "demo harness" for components.  It takes configuration defining the controls that should be generated to drive the props of the wrapped component.  This HOC also allows defining constrained parameters that are dependant on each other by taking a "constraint" callback that can be used to update other props when the target one is changed.

## Running the project
The project was created with create-react-app.  Assuming you have node and yarn installed, in the project root run:
- `yarn install`
- `yarn start`
A browser will open with the running application.