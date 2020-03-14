node {
    try {
        notifyBuild('STARTED')

        ws("${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_ID}/src/bitbucket.org/dealtap/frontend") {
            stage('Trigger build') {
                def scmVars = checkout scm
                def branchName = scmVars.GIT_BRANCH

                //Check if this is a PR.
                if (env.CHANGE_ID) {
                    println "Building from PR"
                    branchName = env.CHANGE_BRANCH
                }

                build job: 'frontend', parameters: [
                    [$class: 'StringParameterValue', name: 'branch', value: "${branchName}"]
                ]
            }

        }
    }catch (e) {
      // If there was an exception thrown, the build failed
        currentBuild.result = "FAILED"
        print e
        notifyBuild(currentBuild.result)
    } finally {
        // Success or failure, always send notifications
        notifyBuild(currentBuild.result)
    }
}

def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} <${env.BUILD_URL}|Job URL> - <${env.BUILD_URL}/console|Console Output>"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }
}
