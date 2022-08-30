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

## Contributing

Currently private
