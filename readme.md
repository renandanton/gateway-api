# GATEWAY API

This is a restful api for provide database operations for another apis.

## Description

Api gateway consists in a abstraction to avoid direct request in database instead all micro services dispatch a request for api gateway provide database informations and operations. The idea was inspired in elasticsearch however it was developed to use relational databases like mysql, postgresql and others.

## Requeriments

You need install this softwares in your computer.

    $ node v6.6.0 or higher

    $ npm 3.10.3

    $ mysql 5.6

    $ redis 3.0

    $ git client


## Docker Installation

I suggest you use [docker](https://docs.docker.com/engine/installation/) and [docker-composer](https://docs.docker.com/compose/install/)  and then execute this instructions:


    $ git clone git@github.com:renandanton/gateway-api.git

    $ cd gateway-api

    $ docker-compose up -d

that's all, your gateway api is ready for use.


## Manual Installation


Clone the repository project:

    $ git clone git@github.com:renandanton/gateway-api.git

Enter in project directory,

    $ cd gateway-api

And then execute:

    $ npm install

Now, change mysql configuration file  in ***config/adpters/mysql.js***:

``` javascript
var mysqlOptions = {
  host: 'mysql',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'my_database'
};
```
Do same thing in redis configuration file in ***config/adapters/redis.js ***

``` javascript
var redisOptions = {
  host: 'redis',
  port: 6379
};
```

and finally run the web server:

    $ npm start

## How to use

Api gateway provide routes to access database operations using http verbs based in rest design:

| SQL Operation | Verb     | Route                  |
| :-----------: |:--------:| :---------------------:|
| QUERY         | POST     |  /cgs/gateway/_search  |
| INSERT        | POST     |  /cgs/gateway/_insert  |
| UPDATE        | PUT      |  /cgs/gateway/_update  |
| DELETE        | DELETE   |  /cgs/gateway/_delete  |

### Insert records in database table via api gateway:

``` curl
curl -H "Content-Type: application/json" -X POST -d '{"insert": {"table": "users","into": ["name","msisdn","password","email","role_id","language_id"],"values": [["Renan","13213232","ADAFDSFA3923AS232112334",	"renan@teste.com.br",1,1], ["Jessyca","78968965","OI32O34PI23JO3KLIOJ","jessyca@teste.com.br",2,2]	]}}' http://localhost:3000/cgs/gateway/_insert
```

Json body data example:

``` json
{
	"insert": {
		"table": "table0",
		"into": [
			"column1",
			"column2",
			"column3",
			"column4",
			"column5",
			"column6"
		],
		"values": [
			[
				"value1",
				"value2",
				"value3",
				"value4",
				1,
				2

			],
			[
				"value1",
				"value2",
				"value3",
				"value4",
				3,
				2
			]
		]
	}
}
```

SQL Output:
```  sql
 INSERT INTO table0 (column1, column2, column3, column4, column5, column6) VALUES  ("value1","value2","value3","value4",1,2), ("value1","value2","value3","value4",3,2)  
```

### Update records in database table via api gateway:

``` curl
curl -H "Content-Type: application/json" -X PUT -d  '{"update": {"table": "users","set": {"name": "Renan Danton de souza XXX","msisdn": "13213232","password": "123456789","email": "renandanton@teste.com.br","role_id": 1,"language_id": 2},"where": {"id": 30}}}'  http://localhost:3000/cgs/gateway/_update
```

Json body data example:

``` json
{
	"update": {
		"table": "table0",
		"set": {
			"field1": "value1",
			"field2": "value2",
			"field3": "value3",
			"field4": "value4@teste.com.br",
			"field5": 1,
			"field6": 2
		},
		"where": {
			"id": 21
		}
	}
}
```

SQL Output:
```  sql
 UPDATE table0 SET field1="value1", field2="value2", field3="value3", field4="value4@teste.com.br", field5=1, field6=2 WHERE id = 21
```

### Delete records in database table via api gateway:

``` curl
curl -H "Content-Type: application/json" -X DELETE -d '{"delete": {"from": "users","where": {"id": 47}}}' http://localhost:3000/cgs/gateway/_delete
```

Json body data example:

``` json
{
	"delete": {
		"from": "users",
		"where": {
			"id": 47
		}
	}
}
```

SQL Output:
```  sql
 DELETE FROM users WHERE id = 47
```

### Do queries in api gateway:

```curl
curl -H "Content-Type: application/json" -X POST -d  '{"query": {"select": ["name","email","created_at","updated_at"], "from": "users","where": {"id": 10}}}' http://localhost:3000/cgs/gateway/_search
```


Json body data example:

``` json
{   
    "query": {
        "select": [
            "name",
            "email",
            "created_at",
            "updated_at"
        ],
        "from": "users",
        "where": {
            "id": 30
        }
    }
}
```

SQL Output:
```  sql
 SELECT name, email, created_at, updated_at FROM users WHERE id = 30
```

- Creating JSQL using ***where operator equal to***:

``` json
"where": {
   "name": "myname"
}
```

SQL Output:
```  sql
 WHERE name = 'myname'
```

``` json
"where": {
    "eq": {
     "name": "myname"
    }
}
```

SQL Output:
```  sql
 WHERE name = 'myname'
```

- Creating JSQL using ***where operator great than***:

``` json
"where": {
	"gt": {
	   "id": 15
	}  
}
```

SQL Output:
```  sql
 WHERE id > 20
```

- Creating JSQL using ***where operator great than or equal to***:

``` json
"where": {
	"gte": {
	   "id": 19
	}  
}
```

SQL Output:
```  sql
 WHERE id >= 19
```

- Creating JSQL using ***where operator less than***:

``` json
"where": {
	"lt": {
	   "id": 17
	}  
}
```

SQL Output:
```  sql
 WHERE id < 17
```

- Creating JSQL using ***where operator less than or equal to***:

``` json
"where": {
	"lte": {
	   "id": 19
	}  
}
```

SQL Output:
```  sql
 WHERE id <= 19
```

- Creating JSQL using ***where and operator***:

``` json
"where": {
    "eq": {
     "name": "myname"
    },
    "operator": "And",
    "eq": {
     "email": "myemail@example.com"
    }
}
```

SQL Output:
```  sql
 WHERE name='myname' and email='myemail@example.com'
```

- Creating JSQL using ***where or operator***:

``` json
"where": {
    "eq": {
     "name": "myname"
    },
    "operator": "Or",
    "eq": {
     "name": "yourname"
    }
}
```

SQL Output:
```  sql
 WHERE name='myname' or name='yourname'
```

- Creating JSQL using ***order by***:

``` json
"order": {
    "id": "DESC",
    "name": "ASC"
}
```

SQL Output:
```  sql
 ORDER BY id DESC, name ASC
```

- Creating JSQL using ***limit***:

``` json
"limit": 5
```

SQL Output:
```  sql
 LIMIT 5
```

- Creating JSQL using ***where in***:

``` json
"where": {
            "in": {
	            "id": [20,30]
            }
        }
```

SQL Output:
```  sql
 WHERE id IN (20,30)
```

``` json
"where": {
            "in": {
	            "name": ["Name1", "Name2"]
            }
        }
```

SQL Output:
```  sql
 WHERE id IN ("Name1", "Name2")
```

- Creating JSQL using ***where not in***:

``` json
"where": {
            "nin": {
	            "id": [20,30]
            }
        }
```

SQL Output:
```  sql
 WHERE id NOT IN (20, 30)
```

``` json
"where": {
            "nin": {
	            "name": ["Name1", "Name2"]
            }
        }
```

SQL Output:
```  sql
 WHERE id NOT IN ("Name1", "Name2")
```

- Creating JSQL using ***where between***:

``` json
"where": {
            "between": {
	            "id": [20,30]
            }
        }
```

SQL Output:
```  sql
 WHERE id BETWEEN 20 AND 30
```

- Creating JSQL using ***where like ***:

``` json
"where": {
			"like": {
				"name": "%na%"
			}
		}
```

SQL Output:
```  sql
 WHERE name LIKE "%na%"
```

- Creating JSQL using  ***inner joins***:

```json
{
	"query": {
		"select": [
			"u.name as nome",
			"u.msisdn as telefone",
			"p.photo as foto",
			"mt.meta as objetivo"
		],
		"from": "users as u",
		"joins": [
			{
				"profiles as p": {
					"on": "p.user_id=u.id"
				}
			},
			{
				"metas as mt": {
					"on": "mt.id=p.meta_id"
				}
			}
		]
	}
}
```

SQL Output:
```  sql
 SELECT u.name AS nome, u.msisdn AS telefone, p.photo AS foto, mt.meta AS objetivo
 FROM users AS u
 INNER JOIN  profiles AS p ON p.user_id=u.id
 INNER JOIN meta AS mt ON mt.id=p.meta_id
```
- Creating JSQL using  ***group by*** and ***having***:

``` json
{
	"query": {
		"select": [
			"r.name as role",
			"COUNT(u.id) as total_role"
		],
		"from": "users as u",
		"joins": [
			{
				"roles as r": {
					"on": "r.id=u.role_id"
				}
			}
		],
		"group": [
			"u.role_id"
		],
		"having": {
			"gte": {
				"COUNT(u.id)": 6
			}
		}
	}
}
```

SQL Output:
```  sql
 SELECT r.name AS role, COUNT(u.id) AS total_role,
 FROM users AS u
 INNER JOIN  roles AS r ON r.id=u.role_id
 GROUP BY u.role_id
 HAVING COUNT(u.id) >= 6
```

### Disabled Redis Caching

For disable caching in a single request, you must send a property in header called ***cached*** with value equals to ***false*** like this:

```curl
curl -H "Content-Type: application/json" -H "cached: false" -X POST -d  '{"query": {"select": ["name","email","created_at","updated_at"], "from": "users","where": {"id": 10}}}' http://localhost:3000/cgs/gateway/_search
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/renandanton/gateway-api. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
