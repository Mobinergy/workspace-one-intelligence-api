# Workspace One Intelligence API
Workspace One Intelligence REST APIs client for Node.js

## Table of Contents

- [Getting Started](#Getting Started)
- [Installing](#Installing)
- [Quick example](#Quick example)
- [Configs](#Configs)
- [Methods](#Methods)
    - [Entities](#Entities)
    - [Attributes](#Attributes)
    - [Metrics](#Metrics)
    - [Report](#Report)
- [Access Token](#Access Token)
- [Resources](#Resources)
- [License](#License)

## Getting Started
Before starting using this package you need to create a service account credentials for API access.

### Creating Service Account
Open you Workspace One Intelligence console and go to `Settings` > `Service Accounts` > `ADD`.\
A service account provides you with a `Client Id` and `Client Secret` and `Token Endpoint`, 
we gonna need them as params to make the package work.


## Installing
```bash
$ npm install --save workspace-one-intelligence-api
```

## Quick Example
```js
const Intelligence = require('workspace-one-intelligence-api');

const intelligence = new Intelligence({
    tokenEndpoint: '...',
    clientId: '...',
    clientSecret: '...'
});

intelligence.entities.listAll()
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err)
    });

// Using async/await
async function getEntities() {
    try {
        const response = await intelligence.entities.listAll();
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}
```

## Configs

### Pagination
Requests that return more than a single object are always paged. Paging is controlled with 2 parameters:
- `page_size`: The number of records to return. `Min: 1`, `Max: 1000`, `Default: 100`.
- `offset`: Offset across the entire data set at which the current page starts. `Min: 0`, `Max: <any>`, `Default: 0`.
- `field`: The field to sort on. `Default: name`.
- `order`: The sort order (ASC or DESC). `Default: ASC`.

##### Example
###### Default sort
```json
{
  "offset": 2000,
  "page_size": 100
}
```
###### Custom sort
```json
{
  "offset": 200,
  "page_size": 1000,
  "sort_ons": [
    {
      "field": "device_enrollment_user_first_name",
      "order": "DESC"
    }
  ]
}
```

### Search Terms
Search terms are provided in a config as an array. This takes three parameters:
- `value`: String value used for searching.
- `fields`: **Optional**  Array of fields to search the value.
- `operator`: **Optional** Search operator specified as a String. This can accept one of the three values : `START_WITH`, `CONTAINS`, `ENDS_WITH`.
##### Example
```json
{
  "search_terms": [{
    "value": "crash",
    "fields": ["name"],
    "operator": "CONTAINS"
  }]
}
```

### Create Report Config
Report creation requires the following information:
- `name`: **Required** - Free-form text string naming the report. It must be unique within the context of a customer
- `description`: **Optional** - Free-form text string describing the report.
- `integration`: **Required** - Identifies the integration from which the data will be sourced.
- `entity`: **Required** - Identifies the entity from which the data will be sourced.
- `column_names`: **Required** - Indicates which attributes will appear in the report.
- `filter`: **Required** - Filter the response.
- `recipients`: **Optional** - Indicates who should receive the output of the report.
##### Example
```json
{
  "name": "Package Test - Enrolled Devices",
  "description": "All enrolled devices with details",
  "integration": "airwatch",
  "entity": "device",
  "column_names": [
    "device_last_seen",
    "device_friendly_name",
    "device_corp_liable",
    "device_enrollment_user_name",
    "device_enrollment_user_first_name",
    "device_enrollment_user_last_name",
    "device_enrollment_user_email",
    "device_platform",
    "device_os_version",
    "device_model_name"
  ],
  "filter": "device_enrollment_status = 'Enrolled'",
  "recipients": [
    {"email":  "test@test.com"},
    {"email":  "test2@test.com"}
  ]
}
```

### Schedule Report Config
Report Schedule creation requires the following information:
- `name`: **Required** - The schedule name.
- `schedule_type`: **Required** - CRON (meaning scheduled).
- `start`: **Required** - The time at which the schedule takes effect (maybe be in the future).
- `cron_expression_detail`: **Required** - Specifies the CRON details.

`cron_expression_detail` Scheduling Options:
- `Only once`: frequency `ONCE`
```json
{
  "cron_expression_detail": {
    "frequency" : "ONCE"
  }
}
```
- `Each hour`: frequency `HOUR`
```json
{
  "cron_expression_detail": {
    "frequency" : "HOURLY",
    "hourly": {
      "interval": 4
    }
  }
}
```
- `Each day`: frequency `DAILY`
```json
{
  "cron_expression_detail": {
    "frequency" : "DAILY",
    "hour": 17,
    "minute": 15
  }
}
```
- `Each week`: frequency `WEEKLY`
```json
{
  "cron_expression_detail": {
    "frequency" : "WEEKLY",
    "hour": 17,
    "minute": 15,
    "weekly": {
      "days_of_week": [
        "SUN",
        "WED"
      ]
    }
  }
}
```
- `Each month`: frequency `MONTHLY`
```json
{
  "cron_expression_detail": {
    "frequency" : "MONTHLY",
    "hour": 17,
    "minute": 15,
    "monthly": {
      "day_of_month": 5
    }
  }
}
```
- `Each year`: frequency `YEARLY`
```json
{
  "cron_expression_detail": {
    "frequency" : "YEARLY",
    "hour": 17,
    "minute": 15,
    "yearly": {
      "day_of_month": 5,
      "month": "JANUARY"
    }
  }
}
```
##### Example
```json
{
  "name": "Schedule Test Hourly",
  "schedule_type": "CRON",
  "start": "2021-06-03T19:00:00.000Z",
  "cron_expression_detail": {
    "frequency": "HOURLY",
    "hourly": {
      "interval": 4
    }
  }
}
```

## Methods
Every resource is accessed via your intelligence instance:
```js
intelligence.<resouce_name>.<method_name>
```

### Entities
```js
intelligence.entities
```
- List all:
```js
intelligence.entities.listAll([config])
```
```js
intelligence.entities.listAll({
    "offset": 0,
    "page_size": 5,
    "search_terms": [{
        "value": "air",
        "fields": ["name"],
        "operator": "CONTAINS"
    }],
    "sort_ons": [{
        "field": "name",
        "order": "ASC"
    }]
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

### Attributes
```js
intelligence.attributes
```
- List all:
```js
intelligence.attributes.listAll(entity[, config])
```
```js
intelligence.attributes.listAll('airwatch.adminuser', {
    "offset": 0,
    "page_size": 100,
    "search_terms": [{
        "value": "version",
        "fields": ["name"],
        "operator": "CONTAINS"
    }],
    "sort_ons": [{
        "field": "name",
        "order": "ASC"
    }]
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

### Metrics
```js
intelligence.metrics
```
- Requests With Simple Time Window:
```js
intelligence.metrics.simpleTimeRange([config])
```
```js
intelligence.metrics.simpleTimeRange({
    "entity": "apteligent.net_event",
    "time_window": {
        "timespan": {
            "duration": 59,
            "unit": "DAYS"
        }
    },
    "metrics": [{
        "name": "bytes_sent",
        "function": "AVG"
    }]
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

- Histogram Requests :
```js
intelligence.metrics.histogram([config])
```
```js
intelligence.metrics.histogram({
    "entity": "apteligent.crash_ios",
    "time_window": {
        "timespan": {
            "duration": 59,
            "unit": "DAYS"
        }
    },
    "sampling_interval": {
        "duration": 1,
        "unit": "DAYS"
    },
    "date_attribute_name": "adp_modified_at",
    "metrics": [{
        "name": "device_model",
        "function": "COUNT"
    }],
    "num_results_per_bucketing_attribute": 10
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

- Rolling Window Requests:
```js
intelligence.metrics.rollingWindow([config])
```
```js
intelligence.metrics.rollingWindow({
    "entity": "apteligent.crash_ios",
    "time_window" : {
        "type" : "rolling_window",
        "start_time": "2020-04-27",
        "end_time": "2020-04-30",
        "sampling_interval" : "1 DAYS",
        "window_size" : "7 DAYS"
    },
    "sampling_interval": {
        "duration": 1,
        "unit": "DAYS"
    },
    "window_size": {
        "duration": 2,
        "unit": "DAYS"
    },
    "metrics": [{
        "name": "disk_space_free",
        "function": "MIN"
    }]
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

### Report
```js
intelligence.reports
```
- List All:
```js
intelligence.reports.listAll([config])
```
```js
intelligence.reports.listAll({
    "offset": 0,
    "page_size": 2
}).then((response) => {
    console.log(response.data);
}).catch((err) => {
    console.log(err);
});
```

- Create:
```js
intelligence.reports.create([config])
```
```js
intelligence.reports.create({
    "column_names": [
        "device_last_seen",
        "device_friendly_name",
        "device_corp_liable",
        "device_enrollment_user_name",
        "device_enrollment_user_first_name",
        "device_enrollment_user_last_name",
        "device_enrollment_user_email",
        "device_platform",
        "device_os_version",
        "device_model_name"
    ],
    "description": "All enrolled devices with details",
    "entity": "device",
    "filter": " device_enrollment_status = 'Enrolled' ",
    "integration": "airwatch",
    "name": "Package Test - Enrolled Devices",
    "recipients": [
        {
            "email": "semlali.yaaqoub@gmail.com"
        }
    ]
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

- Run:
```js
intelligence.reports.run(reportId[, config])
```
```js
intelligence.reports.run('006efb72-514c-4569-8a35-0510287ee68d').then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

- Schedule:
```js
intelligence.reports.schedule(reportId, config)
```
```js
intelligence.reports.schedule('006efb72-514c-4569-8a35-0510287ee68d', {
    "cron_expression_detail": {
        "frequency": "HOURLY",
        "hourly": {
            "interval": 4
        }
    },
    "name": "Schedule Test Hourly",
    "report_id": "5f2c2fa1-e9ec-4c55-9649-b3fbabf4d116",
    "schedule_type": "CRON",
    "start": "2019-06-03T19:00:00.000Z"
}).then((response) => {
    console.log(response.data);
}).catch((err) => {
    console.log(err);
});
```

- Search Downloads:
```js
intelligence.reports.searchDownloads(reportId[, config])
```
```js
intelligence.reports.searchDownloads('006efb72-514c-4569-8a35-0510287ee68d', {
    "offset": 0,
    "page_size": 100
}).then((response) => {
    console.log(response.data);
}).catch((err) => {
    console.log(err);
});
```

- Download:
```js
intelligence.reports.download(reportTrackingId[, config])
```
```js
intelligence.reports.download('d54df1bf-2924-482e-9e19-b8e3d716f46c').then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

- Preview:
```js
intelligence.reports.preview(reportId[, config])
```
```js
intelligence.reports.preview('006efb72-514c-4569-8a35-0510287ee68d', {
    "offset": 0,
    "page_size": 3,
    "sort_ons": [
        {
            "field": "device_enrollment_user_first_name",
            "order": "DESC"
        }
    ]
}).then((response) => {
    console.log(response.data);
}).catch((err) => {
    console.log(err);
});
```

- Set Recipients:
```js
intelligence.reports.setRecipients(reportId[, config])
```
```js
intelligence.reports.setRecipients('006efb72-514c-4569-8a35-0510287ee68d', {
    recipients: [
        {email: 'semlali.yaaqoub@gmail.com'},
        {email: 'test@test.test'},
    ]
}).then((response) => {
    console.log(response.data);
}).catch((err) => {
    console.log(err);
});
```

- Get Recipients:
```js
intelligence.reports.getRecipients(reportId[, config])
```
```js
intelligence.reports.getRecipients('006efb72-514c-4569-8a35-0510287ee68d').then((response) => {
    console.log(response.data);
}).catch((err) => {
    console.log(err);
});
```

## Access Token
In Workspace One Intelligence API to execute a request you need an access token,
and to get that you need to perform another request, so in total 2 requests.\
Every method in this package have `config` param. When you add access token to the `config` param
the request uses that provided token, and when you don't add it, a get token request is executed before the initial request.\
If you are planing to use this package on an application and execute many requests it's better if you use it as the following.

- Get Access Token
```js
intelligence.getAccessToken().then((token) => {
    console.log(token);
}).catch((err) => {
    console.log(err);
});
```

- Use Access Token
```js
intelligence.entities.listAll({
    "token": 'eyJSUzI1NiIsIn.oLmRlYnVnZmlsZSIsImRwYS5z.9Lo9xTmYLIT3yD'
}).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
});
```

## Resources
* [VMware TechZone](https://techzone.vmware.com/getting-started-workspace-one-intelligence-apis-vmware-workspace-one-operational-tutorial)
* [Workspace One Intelligence API Docs](https://vdc-download.vmware.com/vmwb-repository/dcr-public/e1637383-4862-4330-85db-47df70753310/92c31a85-22a7-4659-b342-6098b3a0cd4d/DHUB-APIDocumentationforVMwareWorkspaceONEIntelligence-230920-1721-3296.pdf)

## License
[MIT](LICENSE)
