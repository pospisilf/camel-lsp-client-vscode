# Create a Camel Route using Camel JBang

- The [JBang](https://www.jbang.dev/documentation/guide/latest/index.html) cli must be available on a system command-line.

## YAML DSL

<p align="center"><img src="../images/camelRouteYamlDSL.gif" alt="Camel Route YAML DSL command" class="zoom" width="90%"/></p>

## Java DSL

<p align="center"><img src="../images/camelRouteJavaDSL.gif" alt="Camel Route Java DSL command" class="zoom" width="90%"/></p>

## XML DSL

<p align="center"><img src="../images/camelRouteXMLDSL.gif" alt="Camel Route XML DSL command" class="zoom" width="90%"/></p>

## From an OpenAPI file with YAML Dsl

<p align="center"><img src="../images/generateCamelRouteFromOpenAPI.gif" alt="Camel Route YAML DSL from OpenAPI command" class="zoom" width="90%"/></p>

# Transform a Camel route to YAML using Camel JBang

- The [JBang](https://www.jbang.dev/documentation/guide/latest/index.html) cli must be available on a system command-line.

<p align="center"><img src="../images/transformCamelRouteToYAML.gif" alt="Transform Camel Routes from XML and Java to YAML using Camel JBang" class="zoom" width="90%"/></p>

# Create a Camel project (using Camel JBang export)

- The [JBang](https://www.jbang.dev/documentation/guide/latest/index.html) cli must be available on a system command-line.

## Quarkus

It is asking for the Maven GAV (group id, artifact id, version) to be used to generate the project.

In case there are Camel files in the workspace, it is copying them in `src/main/resources/camel` folder of the created Camel Quarkus based project.

<p align="center"><img src="../images/createCamelQuarkusProjectBasic.gif" alt="Command to create a Camel Quarkus project in VS Code. From command-palette, it can be found by typing `Camel Quarkus`." class="zoom" width="90%"/></p>

## SpringBoot

It is asking for the Maven GAV (group id, artifact id, version) to be used to generate the project.

In case there are Camel files in the workspace, it is copying them in `src/main/resources/camel` folder of the created Camel Quarkus based project.

<p align="center"><img src="../images/createCamelSpringBootProjectBasic.gif" alt="Command to create a Camel on SpringBoot project in VS Code. From command-palette, it can be found by typing `Camel SpringBoot`." class="zoom" width="90%"/></p>
