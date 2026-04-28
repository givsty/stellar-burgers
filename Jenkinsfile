pipeline{
    agent any

    stages{
        stage("build frontend"){
            steps{
                sh "npm i"
                sh "npm run build"
            }
        }
    }
}