#!/bin/bash

# Define an array of your schema names
declare -a schemas=("Department" "User" "Dimension" "Material" "MaterialDetail" "PurchaseOrder" "Transaction" "Delivery" "Inventory" "WorkType" "Project" "WorkItem" "WorkDone" "Plan" "Execution")

# Loop through the schema names and create controller files
for schema in "${schemas[@]}"
do
  # Convert schema name to lowercase using awk
  filename=$(echo "${schema}" | awk '{print tolower($0)}')Controller.js

  # Create the controller file with customization
  cat <<EOF > "${filename}"
const ${schema} = require("../../schemas/${schema}");
const crudHelper = require("./crudHelper");
const genericController = crudHelper(${schema});

// any additional controller logic goes here
// e.g. overriding the genericController methods
// or adding new methods

module.exports = genericController;
EOF
done
