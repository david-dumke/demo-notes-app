import * as sst from "@serverless-stack/resources"

export default class ApiStack extends sst.Stack {
    // Public
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { table } = props;

        //Create the API
        this.api = new sst.Api(this, "Api", {
            // Enabled by default
            cors: true,
            defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName,
                    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
                }
            },
            routes: {
                "GET    /notes": "src/note/list.main",
                "POST   /notes": "src/note/create.main",
                "PUT    /notes/{id}": "src/note/update.main",
                "GET    /notes/{id}": "src/note/get.main",
                "DELETE /notes/{id}": "src/note/delete.main",
                "POST   /billing": "src/util/billing.main",
            }
        });

        // Allow the API to access the table
        this.api.attachPermissions([table]);

        // Show the API endpoint to the output
        this.addOutputs({
            ApiEndpoint: this.api.url,
        });
    }
}