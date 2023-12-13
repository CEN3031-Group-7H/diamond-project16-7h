# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit

### Project 16: Gamification
> This project entailed the introduction of badges and a student profile to the CASMM system.

#### Features Implemented:
Search profile (student view)
- Students have the ability to search through classmates and access their date of membership and the badges they own. Students can thus compare their achievements with friends and work harder to earn badges they deem desirable.
- Wireframe:
- <img width="611" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/3783a9c3-d474-4f2b-b3ee-f12633f99453">
- Implementation: 
- ![Screenshot 2023-11-27 175745](https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/55063816/5d65bf89-89a7-43c3-8ef7-de3ddc9e441e)

View created badges (teacher view)
- Teachers can view the badges they have created to keep track of used images or assigned badges. This allows them to assign a past badge to more students or ensure that a badge is not created twice.
- Wireframe:
- <img width="625" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/3f77b9db-8d47-458d-ab80-361fba59dcc7">

- Implementation:
- <img width="355" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/610434c1-21d5-414a-81ee-66340c12dd1c">


View badge details (teacher & student)
- Students and teachers are able to view a badge's name, criteria, description, and percentage of students who have earned it. Teachers can use this information to determine who to assign a badge to while students can use this as motivation to work towards earning a new badge.
- Wireframe:
- <img width="627" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/cce9deab-c0ac-4fec-9089-f477b58e192a">

- Implementation:
- <img width="564" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/0e36b1e5-0418-4fc7-9e85-897ce81063e0">


Upload custom badge via URL (teacher view)
- Teachers can upload an image via URL to represent a badge. This allows teachers to import artwork from other sites as well as find custom images that cater to their specific class.
- Wireframe:
- <img width="627" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/940c20d8-5b3a-43de-bc6b-b1bf6270f2d0">

- Implementation:
- <img width="297" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/bd44221e-4682-4040-9a53-2abacff4a557">


Create custom badge via default template (teacher view)
- Teachers were provided 6 default badges including a ribbon, trophy, apple, heart, star, and thumbs up. This allowed badges to be created with minimal effort for teachers who may not have the time to find appropriate badges for students.
- Implementation:
- <img width="399" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/56553f48-2d00-4e12-8857-93a952abc5c9">


Assign badges to students (teacher view)
- Teachers have a simple checkbox system to assign badges to students.
- Wireframe:
- <img width="262" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/77970261-2c81-4411-ae61-21e53c71ce53">

- Implementation:
- <img width="294" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/9ee149cd-853f-4845-9b82-d89521976f42">


View earned badges (student view)
- Students have a tab on their page to view the badges they have earned. This is displayed gallery style.
- Wireframe:
- <img width="611" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/99da4239-52e1-4dd3-b80f-266515504357">

- Implementation:
- <img width="618" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/f19da2fa-8685-400a-8369-045555a76164">


Edit visibility of badges (student view)
- Students have the ability to hide or show badges on their public profile so that those who search them up only see the badges they are proud of.
- Wireframe:
- <img width="500" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/beb529ce-307f-4af6-a92a-a38d29ece90f">

- Implementation:
- <img width="625" alt="image" src="https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/76bb99c4-2b17-486a-b500-12fd3fa4b8d2">


#### Running the Project Locally
> Same setup as the development instructions above.

### Permissions Setup
> It is necessary to have permissions in Strapi Roles match the permissions in the routes.json files. These changes to not seem to save to git, so here are the changes that will need to be made:
> Allow the student role to access badge/countearners, classroom/countstudents, student/granthidebadgearr, stuednt/hidebadge, student/showbadge
> ![image](https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/634978b8-a8d1-443d-9350-9d1badb26187)
> Allow the teacher role to access badge/countearners, badge/create, badge/delete, badge/find, badge/findone, badge/update, classroom/countstudents
> ![image](https://github.com/CEN3031-Group-7H/diamond-project16-7h/assets/78508701/f278a3eb-68a8-4e8c-bc66-94d581314d4e)



#### How to update database and server connections:
> New server/client/database connections can be added by creating a new route to the respecctive server/api/ component, followed by creating a controller for that route request, and lastly adding a request method to the client/utils/requests.js file.

#### Updating STRAPI dump files (and creating a new one)
- Use this page to learn how to create a new Strapi .dump file: [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md)
* NOTE: The command on this page is incorrect and should be the following:
> pg_dumpall -U postgres strapi -f dumpall.dump
- To re-create your database using the dump file, use "docker compose down" followed by "docker compose up" OR delete the db-dev image in Docker desktop and then run "docker compose up"

#### Outstanding Work (unfinished or not started):
- Automatic Badge Assignment
  > Our idea for this feature is to allow for certain badges to be automatically assigned, without the teacher doing anything. Automatic assignment would definitely be used for time-based badges (eg. Member for 5 months, New Member, etc.), but can also be used for work-based badges (such as having the highest score on an assignment).

- Profile banner
  > Banner is somewhat redundant so we deprioritized this feature after Sprint 1.
  > This feature would involve a badge or banner being chosen to display on or around the profile picture or profile page.

- Canvas for custom badges
  > Opted for inputting an image link address or choosing a preset image for ease of use.
  > This would involve implementing a browser-based canvas (similar to GIMP or a pixel art application) for creating a badge image from scratch.

- Admin access
  > Requires the admin role to exist (other than the Strapi admin). Admins would be school administrators, school board officials, etc. We wanted the admin to be able to see all badges made by teachers in their school organization. The view would be similar to the teacher view, but with all of the badges shown.

#### Built Upon
- Used react-tabs for the tabbed panel view on the student profile
- Used react-modal for the popups that occur during viewing more badge info (teacher and student views).
