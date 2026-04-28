pipeline{
    agent any

    stages{
        stage("build frontend"){
            steps{
                sh "npm install"
                sh "npm run build"
            }
        }
    }
}