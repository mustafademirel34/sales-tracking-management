
# Sales-Tracking Management

[![GitHub Lisans](https://img.shields.io/github/license/mustafademirel34/sales-tracking-management)](https://github.com/mustafademirel34/sales-tracking-management/blob/main/LICENSE)
![Angular Version](https://img.shields.io/badge/Angular-v16.1.0-red)
![C# Core Version](https://img.shields.io/badge/C%23%20Core-6.0.22-orange)
![GitHub Dil Sayısı](https://img.shields.io/github/languages/count/mustafademirel34/sales-tracking-management)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mustafademirel34-blue)](https://www.linkedin.com/in/mustafademirel34/)

###### Explanation
This project is an application that aims to sell certain items to customers and track the delivery of the items to the customer. Mssql was preferred as the database and API service was preferred as the backend.

<div class="image-container">
    <img src="https://r.resimlink.com/jAL7_6.png" alt="Image 1" style="width: 48%; float: left; margin-right: 2%;">
    <img src="https://r.resimlink.com/J7kSgXoC.png" alt="Image 2" style="width: 48%;">
</div>

## Usage Information


On the home page you can access the following features:

- View all records
- Creating a new record
- Print out the list of items to be shipped as marked in the "Vehicle" section
- General data output
- Settings and exit buttons

#### Calendar Page
This page is an area where records can be viewed by month, distributed by month.

#### Stock
Stock is an experimental feature and is not ready at this time.

- Calendar entry
- Option to search records by customer's phone number
- Transfer Tomorrow option: Transfers unfinished and unfulfilled tasks at the end of the day to tomorrow
- Vehicle placements: Shows which vehicle will be removed and delivered by which vehicle

In the main window, the banner at the top shows what content is currently available. Additionally, there are options:

- "Show today's recordings" button
- Buttons to go forward and back in the calendar
- Filtering tasks by completion status (completed, incomplete or all)
- Number list that determines the number of records to be displayed simultaneously

### Viewing Records

Records are displayed according to filters and options. A task has additional information, which can be accessed by clicking on the task's details. When you click on a record or task, you access the page with detailed information. On this page you can see customer, sales and intervention information.

### Detail Page

When you click on a record or task, you access the page with detailed information. When you create a new record, this information will be blank and fillable.

### Customer Information

When you fill in the information about the customer on the left and open a record, the customer will be recorded as their phone number.

- **Call Customer:** With this button, you can check whether there is a customer for the phone number you entered.

### Sales Information

In the middle, there will be item information for sale. When you enter your product type information, you can use the (Price(x)Quantity)-Discount information to determine a price.

- **Multiple Records:** You can add or delete multiple records.
- **Payment Information:** You can take part of the payment and leave the remaining payment information with the information "fee will be charged" during the task delivery.

### Mission Information

On the right side, there will be information about task completion, updating, printing receipt information, deleting the task and postponing it. The information on the buttons here should appear exactly as it is.

- **Only When "Completed" is Marked:** No changes can be made to the record later, but it can be deleted.

- **New Registration:** During the new registration, there will be only the "Add New" button.


#### Background Information

- Username and password option is available (off by default).
- If the website cannot reach the API, it displays 500 error information.
- If the page is not found, it shows a 404 error.
