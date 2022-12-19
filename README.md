# ShopizerMatero

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## 3rd-party libraries integration

### TinyMCE

We used TinyMCE for the product description editor. TinyMCE is a commercial product and requires a license to use. You can get a free license for development purposes at [https://www.tiny.cloud/pricing/](https://www.tiny.cloud/pricing/). And TinyMCE provides a guide for angular integration [https://www.tiny.cloud/docs/tinymce/6/angular-ref/](https://www.tiny.cloud/docs/tinymce/6/angular-ref/).

#### Dependencies

1. `@tinymce/tinymce-angular`
2. `tinymce`

#### Project changes

In order to use tinymce scripts, we need to add the following code in `angular.json` file:

```json
{
  "projects": {
    "shopizer-matero": {
      "architect": {
        "build": {
          "options": {
            "assets": [{ "glob": "**/*", "input": "node_modules/tinymce", "output": "/tinymce/" }]
          }
        }
      }
    }
  }
}
```
