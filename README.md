## What?


__Features:__

- Full implementation of CSS3 selectors
- Partial implementation of jQuery/Sizzle extensions
- Very high test coverage
- Pretty good performance

## Why?

The neo4j-driver and neo4j HTTP API are wonderful tools for executing cypher queries and returning results. However, for many use cases, the meta data returned is deeply nested and contains information that isn't the most useful. This simple wrapper around the driver helps provide an easy way to return the the neo4j response object, stripped away of all information except the properties of the nodes queried. 

Example Neo4j-Response:

```js
{
    "results": [
        {
            "columns": [
                "c"
            ],
            "data": [
                {
                    "row": [
                        {
                            "Dob": "12.12.2000",
                            "name": "Alice",
                            "last_name": "Wonderland"
                        }
                    ],
                    "meta": [
                        {
                            "id": 0,
                            "type": "node",
                            "deleted": false
                        }
                    ]
                },
                {
                    "row": [
                        {
                            "Dob": "3.3.1989",
                            "name": "Bob",
                            "last_name": "Missy"
                        }
                    ],
                    "meta": [
                        {
                            "id": 1,
                            "type": "node",
                            "deleted": false
                        }
                    ]
                }
```

Example Neo4j-Response:

```js
[ 
    { 
        dob: '12.12.2000', 
        name: 'Alice' 
        last_name: 'Wonderland'
    } 
],
[ 
    { 
        dob: '3.3.1989', 
        name: 'Bob',
        last_name: 'Missy'
    } 
]
```