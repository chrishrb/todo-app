#!/bin/bash
echo "Generating pdf from swagger docs.."
docs_json=$(curl -X GET -s http://localhost:3000/v3/api-docs)
encoded_json_request=$(jq -n --arg docs_json "$docs_json" '{"text": $docs_json, "openApi": true}')
response=$(curl -X POST -s "https://www.swdoc.org/api/sw-generator/spec" -d "$encoded_json_request" -H "Content-type: application/json")
echo "Done"
echo "Downloading pdf.."
curl -X GET -s https://www.swdoc.org/api/sw-generator/document/$(echo $response | jq -r '.id') > ../appendix/swagger_docs.pdf
echo "Done"
