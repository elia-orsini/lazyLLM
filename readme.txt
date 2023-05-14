# readme

## overview

The submitted code is available on GitHub at the following repository: https://github.com/elia-orsini/lazyLLM.

This zipped folder is divided into two separate parts. These two parts are contained in the python folder and the lazyLLM folder.

The python folder simply includes all the python functions that have been utilised to calculate the metrics present in the project report. Most of these metrics are implementations of external libraries which are clearly imported in the python file.

The lazyLLM folder contains the code of the fron-end platform we developed. The code is structured into the following folders each of which is important for the correct functioning of our front-end platform. The main folders are:
- Components: This folder contains all the React UI functional components our platform uses. Examples of these functional components include the footer of the website or the UI component to create template-based prompts.
- css: This foldersimplycontainsaCSSfilethatimportsathird-partyCSSlibrarycalledTailwind CSS. This library condenses a lot of CSS functionality into a few classes which can easily be used. This all makes it very easy to create great user interfaces in fewer lines of code.
- pages: This folder is fundamental in that it includes TypeScript files for each path available for our websites. To clarify this concept: this path will for example have a TypeScript file named “datasets.tsx” and it will render the UI components available at https://lazyLLM.xyz/ datasets.
- public: This folder contains all the static files served on our website such as image files or datasets data.
- utils: This folder contains some custom scripts used on multiple pages and therefore abstracted to make the code as reusable as possible. Examples include the code to parse the OpenAI evals dataset.

Furthermore, the lazyLLM folder includes other files that contain the Next.js configurations or tailwind CSS configurations to correctly run the webapp.

## How to run the platform locally

To run this platform locally, there is a fundamental requirement that needs to be satisfied which is to have a copy of Node.js and NPM running on your local machine. The installation of these libraries varies a lot depending on the OS version used. When utilising macOS this can be done by using the homebrew library and by typing the following command:
```
brew install node
```
After having run this, you will have a copy of Node.js and NPM running on your machine. When utilising a Windows machine, Node.js and NPM can be installed by using the official installed offered on the Node.js official website (https://nodejs.org/en). After having followed the installation process, you will have copies of Node.js and NPM successfully running on your machine.
Once the code of the platform it has been downloaded and the appropriate environment variables have been defined, the first step to run the platform locally is to install all the NPM dependencies. This can be done by typing the following command in the root directory:
```
npm install
```
This command will install all the required dependencies and once these are all installed, the com- mand to start the platform is the following:
```
npm run dev
```
This last command will start the local development environment and run the web app at http://localhost:3000 on your local machine.

The space requirement for the front-end platform to be installed is currently at around 900 MB. This large space requirement is mainly due to the number of NPM dependencies the project is built upon. There are no performance requirements, the platform should be able to be built on most laptops or operative systems.