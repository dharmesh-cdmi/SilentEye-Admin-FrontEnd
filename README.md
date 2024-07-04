
# Admin Dashboard with React Js + Vite + ShadCN

A brief description of what this project does 


## Screenshots

Dashbaord : 

![App Screenshot](https://github.com/ISRAFIL-HOSSAIN/AllProjectShowcase/blob/silenteye_demo/Silent_Admin_Dashboard.png?raw=true)

OrderPage : 

![App Screenshot](https://github.com/ISRAFIL-HOSSAIN/AllProjectShowcase/blob/silenteye_demo/OrderPage.png?raw=true)


## Tech Stack

**Client:** React, Vite , TailwindCSS , ShadCN , Tanstack Table , Radix Ui. 

**Icon :** lucide Icons(https://lucide.dev/icons), 
tablar icons(https://tabler.io/icons).  

**Server:** Pending ... 


## Installation

Install this Project

```bash
  npm install

```

## Run The Project 

```bash 
    npm run dev 
```
    
## Usage/Examples

```javascript
// Table Uses : 
import Component from 'my-project'

function App() {
  return <DataTable data={tasks} columns={columns} />
}
```

```javascript
// Tab Uses  : 
import Component from 'my-project'

function App() {
  return (
      <Tabs // This is Shadcn Tabs
          orientation="vertical"
          defaultValue="purchase"
          //  className="space-y-4 h-full" //</div>==> You can add ClassName here according to your customization
        >
          {/* This is Common TabsListCompnent  */}
          <CustomTabs tabs={tabsConfig} />
          <TabsContent value="purchase" className="">
            <DataTable data={tasks} columns={columns} />
          </TabsContent>
          <TabsContent value="checkout" className=" bg-orange-400 ">
            <div>hello</div>
          </TabsContent>
        </Tabs>
  )
}
```
```javascript 
 // Chart Usages
 
 <LineChart data={testData} categories={testCategories} />
```

```javascript 
 // Date Range Picker Usages

 <DateRangePicker showCompare={false}/>
```


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Authors

- [@Israfil Hossain](https://www.github.com/israfil-hossain)

