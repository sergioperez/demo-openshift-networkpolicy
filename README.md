# User database + manager

These apps have been developed to do a small workshop about the NetworkPolicies in OpenShift

## App components

The app has two main components, the User Database and the User Manager

### User Database

The User Database app is a simple web service which works as a database with a REST interface.

It has three routes:

```
GET /

Shows the available routes


GET /users

Returns a JSON object with the information of all the stored users

POST /user

Stores a new user with the given userName param as its name

```

### User Manager

UserManager has a frontend which shows a list of users and a form to create an user.

On its backend, it gets the list of users from the User Database, and it creates users sending a POST request to the user database.


## How to deploy

First of all, we will create a project to perform any test with this repo.

```bash
oc new-project networkpolicy-demo --description="tests" --display-name="networkpolicy-demo"
```

Now, we can deploy the user database using S2I:

```bash
oc new-app https://gitlab.com/sergioperez/nodejs-express-demo.git --context-dir=user_database --name="nodejs-database"
```

Then, we will create route so we can perform requests directly to the database for testing purposes:

```bash
oc expose svc/nodejs-database
```

Once the database is deployed, we can modify the route so our connections are routed through https

```bash
oc patch route nodejs-database-p '{"spec": {"tls": {"insecureEdgeTerminationPolicy": "Redirect", "termination": "edge"}}}'
```

Now it is time to deploy the UserManager app, and we pass the DATABASE_USERS_URL as an environment variable
```bash
oc new-app https://gitlab.com/sergioperez/nodejs-express-demo.git --context-dir=user_manager --name="nodejs-manager" --env DATABASE_USERS_URL=http://nodejs-database.networkpolicy-demo.svc.cluster.local:8080
```

And we are almost done! Just do the same as you did with the UserDatabase app, expose it to create a route, and add an https redirection.

```
oc expose svc/nodejs-manager
oc patch route nodejs-manager -p '{"spec": {"tls": {"insecureEdgeTerminationPolicy": "Redirect", "termination": "edge"}}}'
```

Now we can enter to the **network_policies** folder and apply the different NetworkPolicy objects to the pods of the project using the following syntax:

```bash
oc create -f network_policy_file.yaml
``` 

You can add labels to the pods with the following syntax:

```bash
oc label pod pod_name "labelname=labelvalue"
```

Warning: If you label a pod, the label will be lost when it is finished, so this is only being done to demonstrate how a NetworkPolicy object works.

In order to delete a NetworkPolicy object, you can run:

```bash
oc delete NetworkPolicy network_policy_name
```

or

```bash
oc delete -f network_policy_file.yaml
```

And now... Start playing with your NetworkPolicies! :)


## Extra content

### Set a NetworkPolicy by default to the newly created projects

https://docs.openshift.com/container-platform/3.9/admin_guide/managing_networking.html#admin-guide-networking-networkpolicy-setting-default

### Allow access to our apps from the pods

https://docs.openshift.com/container-platform/3.9/admin_guide/managing_networking.html#admin-guide-networking-networkpolicy-routers
