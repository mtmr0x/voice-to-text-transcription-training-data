# Voice to text transcription training data

## Contributing

For details with How to contributing please go to our documentation [clicking here](https://github.com/mtmr0x/voice-to-text-transcription-training-data/blob/master/CONTRIBUTING.md).

## Installation and set up

Follow the steps below for install the whole ecosystem for this project

### Project internal requirements

**Install NodeJS 10.16**

You can do it by using NVM: https://github.com/creationix/nvm

After installing NVM run:

```sh
# Install version 10.16 of NodeJS
nvm install 10.16

# Use version 10.16 of NodeJS in this session
nvm use 10.16

# This step is not necessary, but if you wish to set this version as default, simply run it:
nvm alias default 10.16
```

**Install project internal dependencies**

```
npm i
```

**Server configuration**

Locate the `.env.sample` file in the root folder and copy and paste it into a file named `.env`, replace all environment variables values to actual values. You can find it with one of the developers. That's a great time to you ask all why's in this project.

## Run

**Simple compile and start**

```sh
npm run start path-to-file
```

Example: there are static files generated for examples at `static` folder. You may simply run:

```sh
npm run start ./static/input2.txt
```

