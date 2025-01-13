POST http://localhost:3000/signup
Content-Type: application/json
HTTP 422
[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
jsonpath "$.oops" == "username: missing"


POST http://localhost:3000/signup
Content-Type: application/json
{
  "username": "asdomare"
}

HTTP 422
[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
jsonpath "$.oops" == "password: missing"


POST http://localhost:3000/signup
Content-Type: application/json
{
  "username": "asdomare",
  "password": "asdomare"
}

HTTP 200
[Asserts]
header "Content-Type" == "application/json; charset=utf-8"
jsonpath "$.message" == "ok"
