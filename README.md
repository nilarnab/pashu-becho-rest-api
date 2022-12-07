# buyBOLD API

## API Reference

### Register

```http
  POST /auth/register
```

#### Query

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `name`     | `string` |              |
| `email`    | `string` |              |
| `password` | `string` | length >= 8  |
| `phone`    | `string` | length == 10 |

#### Response

| Response | Type   | Description                   |
| :------- | :----- | :---------------------------- |
| verdict  | bool   | true if success, false if not |
| message  | string | reason of verdict             |

### Login

```http
  POST /auth/login
```

#### Query

| Parameter  | Type     | Description |
| :--------- | :------- | :---------- |
| `email`    | `string` |             |
| `password` | `string` | length >= 8 |

#### Response

| Response | Type   | Description                   |
| :------- | :----- | :---------------------------- |
| verdict  | bool   | true if success, false if not |
| message  | string | reason of verdict             |


### Handle Cart Operation

```http
  POST /handleCartOps/show_items
```

#### Query

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `user_id`  | `string` |              |


#### Response

| Response | Type   | Description                   |
| :------- | :----- | :---------------------------- |
| verdict  | bool   | 1 if success, 0 if not |
| data     | json   | all the valid cart items      |
| message  | string | reason of verdict             |


```http
  POST /handleCartOps/insert
```

#### Query

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `user_id`  | `string` |              |
| `prod_id`  | `string` |              |
| `qnt`      | `Number` | |

#### Response

| Response | Type   | Description                   |
| :------- | :----- | :---------------------------- |
| verdict  | bool   | 1 if success, 0 if not |
| data     | json   | response     |
| message  | string | reason of verdict             |

```http
  POST /handleCartOps/alter
```

#### Query

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `cart_id`  | `string` |              |
| `qnt_new`  | `Number` | New quantity          |


#### Response

| Response | Type   | Description                   |
| :------- | :----- | :---------------------------- |
| verdict  | bool   | 1 if success, 0 if not |
| data     | json   | response     |
| message  | string | reason of verdict             |


```http
  POST /handleCartOps/purge
```

#### Query

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `cart_id`  | `string` | cart id to be deleted             |


#### Response

| Response | Type   | Description                   |
| :------- | :----- | :---------------------------- |
| verdict  | bool   | 1 if success, 0 if not |
| data     | json   | response     |
| message  | string | reason of verdict             |


## Contributing

we will be adding more 
