pipeline{
    agent any
    tools {
        nodejs 'NodeJS'
    }

    stages{
        stage("build frontend"){
            steps{
                sh "npm install"
                sh "npm run build"
            }
        }
    }
}