pipeline {
  agent {
    label "builder-base"
  }
  environment {
    ORG = 'joule-cma'
    APP_NAME = 'cmaj-legend'
  }
  stages {
    stage('CI Build and push snapshot') {
      when {
        branch 'PR-*'
      }
      environment {
        PREVIEW_VERSION = "0.0.0-SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER"
        PREVIEW_NAMESPACE = "$APP_NAME-$BRANCH_NAME".toLowerCase()
        HELM_RELEASE = "$PREVIEW_NAMESPACE".toLowerCase()
      }
      steps {
        container('builder-base') {
          sh "npm install"
          sh "CI=true DISPLAY=:99 npm test"
          sh "export VERSION=$PREVIEW_VERSION && skaffold build -f skaffold.yaml"
          sh "echo 'DEVELOPMENT RELEASE'"
          sh "jx step post build --image $DOCKER_REGISTRY/cmaj/legend/legend-app:$PREVIEW_VERSION"        

          dir('./charts/preview') {
            sh "make preview"
            sh "jx preview --app $APP_NAME --dir ../.."
          }
        }
      }
    }
    stage('Build Release') {
      when {
        branch 'master'
      }
      steps {
        container('builder-base') {

          // ensure we're not on a detached head
          sh "git checkout master"
          sh "git config --global credential.helper store"
          sh "jx step git credentials"
          //setup gcp service account access
          withCredentials([string(credentialsId: 'google-cloud-service-account', variable: 'SERVICE_ACCOUNT_KEY')]) {
            writeFile file: '/home/jenkins/workspace/Joule-CMA_CMAJ-Legend_master/key.json', text: SERVICE_ACCOUNT_KEY
            sh "gcloud auth activate-service-account --key-file key.json"
            }
          // so we can retrieve the version in later steps
          sh "echo \$(jx-release-version) > VERSION"
          sh "jx step tag --version \$(cat VERSION)"
          sh "npm install"
          sh "echo 'PRODUCTION RELEASE'"
          //sh "CI=true DISPLAY=:99 npm test"
          sh "CI=true DISPLAY=:99"
          sh "export VERSION=`cat VERSION` && skaffold build -f skaffold.yaml"
          withCredentials([string(credentialsId: 'google-cloud-service-account-development-cluster', variable: 'SERVICE_ACCOUNT_KEY')]) {
            writeFile file: '/home/jenkins/workspace/Joule-CMA_CMAJ-Legend_master/key-development.json', text: SERVICE_ACCOUNT_KEY
            sh 'gcloud auth activate-service-account --key-file key-development.json'
            sh 'gcloud container clusters get-credentials joule-development-can-ne-a-k8s --zone northamerica-northeast1-a --project joule-development-218113'
            sh "kubectl set image deployment cmaj-legend cmaj-legend=gcr.io/joule-development-218113/cmaj/legend/legend-app:\$(cat VERSION) -n legend"
            }     
          }
      }
    }
  }
  post {
        always {
          cleanWs()
        }
  }
}
