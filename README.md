# Hebrew Calendar App
User stories ('As a user...')
- View all calendar items from API - Index
  - import all calendar items to different schemas according to type
  - look for all calendar entries
  - display all calendar entries

- View single calendar item from API - Show
  - look for one calendar item
  - display single item searched for
  - Save single calendar item to personal folder

- Personal calendar - View all items - Saved
  - look for all items in personal folder
  - display all items in personal folder

- Personal calendar - Create new entry - New
  - new schemas (different schemas depending on event type)
  - create the different models to use

- Personal calendar - Edit a single entry - Edit
  - look for a single entry
  - edit that entry
  - get back the updated version

- Personal calendar - Delete single entry - Delete
  - look for a single entry
  - remove entry from db
  - display confirmation


Schemas
- Event entry
  - Category: string
  - title: String / time
  - time: date / time
  - memo: string
  - hebrew: string
  - hebrew date: string
  - yomtov: boolean
  - owner

- Personal Calendar
  - Name: string
  - Description: string
  - Events: Array of strings by 
  - owner


![](ERD.png)

![](route_table.png)

![](wire%20frames.png)







Route table:
Name:    |Path:        |HTTP Verb |Purpose
Index    |/cal         |GET       |Display all info from API
Show     |/cal/:id     |GET       |Display single item
Show     |/cal/personal|GET       |Display personal calendar
Save     |/cal/save    |GET       |Save single item to personal calendar
New      |/cal/new     |GET       |Displays a form to add a new entry
Create   |/cal         |POST      |Create the new entry in the DB
Edit     |/cal/:id/edit|GET       |Show edit item form
Update   |/cal/:id     |PUT       |Update a single item
Destroy  |/cal/:id     |DELETE    |Delete single saved item


## Technical Requirements

Your app must:

* **Include a readme file** that explains how to use your app and contains a route table for your RESTful routes
* Have **semantically clean HTML, CSS, and back-end code**
* **Be deployed online** and accessible to the public

## Necessary Deliverables

* A **working full-stack application, built by you**, hosted somewhere on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted project,  and frequent commits dating back to the **very beginning** of the project. Commit early, commit often.
* **A `readme.md` file** with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, and a link to the live site.

## Suggested Ways to Get Started

* Start with wireframes and go through a project planning process. Consider what is your:
  * Goals for each 'sprint'
  * MVP
  * Stretch Goals
* **Begin with the end in mind.** Know where you want to go by planning with wireframes & user stories, so you don't waste time building things you don't need
* **Don't hesitate to write throwaway code to solve short term problems**
* **Read the docs for whatever technologies you use.** Most of the time, there is a tutorial that you can follow, but not always, and learning to read documentation is crucial to your success as a developer
* **Commit early, commit often.** Don't be afraid to break something because you can always go back in time to a previous version.
* **User stories define what a specific type of user wants to accomplish with your application**. It's tempting to just make them _todo lists_ for what needs to get done, but if you keep them small & focused on what a user cares about from their perspective, it'll help you know what ot build
* **Write pseudocode before you write actual code.** Thinking through the logic of something helps.

## Useful Resources

* [**Writing Great User Stories**](https://techdocs.broadcom.com/us/en/ca-enterprise-software/agile-development-and-management/rally-platform-ca-agile-central/rally/learning-agile/agile-practices/write-a-great-user-story.html) _\(for user story tips\)_
* [**Presenting Information Architecture**](http://webstyleguide.com/wsg3/3-information-architecture/4-presenting-information.html) _\(for more insight into wireframing\)_

## Project Feedback + Evaluation

* **Project Workflow**: Did you spend an adequate amount of time on the planning process? Did you use source control as expected? Are your commit messages clear? Do you have a readme file?
* **Technical Requirements**: Did you deliver a project that met all the technical requirements? Given what the class has covered so far, did you build something that was reasonably complex?
* **Creativity**: Did you added a personal spin or creative element into your project submission? Did you deliver something of value to the end user \(not just an index page\)?
* **Code Quality**: Did you follow code style guidance and best practices covered in class, such as spacing, modularity, and semantic naming? Did you comment your code as your instructors as we have in class?
* **Problem Solving**: Are you able to defend why you implemented your solution in a certain way? Can you demonstrated that you thought through alternative implementations? _\(Note that this part of your feedback evaluation will take place during your one-on-one code review with your instructors, after you've completed the project.\)_
* **Total**: Your instructors will give you a total score on your project between:

| Score | Expectations |
| :--- | :--- |
| **0** | _Incomplete._ |
| **1** | _Does not meet expectations._ |
| **2** | _Meets expectations, good job!_ |
| **3** | _Exceeds expectations, you made an awesome product!_ |

This will serve as a helpful overall gauge of whether you met the project goals, but **the more important scores are the individual ones** above, which can help you identify where to focus your efforts for the next project!
