import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import StorageStack from "../stacks/StorageStack";

test("Test StorageStack", () => {
    // GIVEN we have an app
    const app = new sst.App()

    // WHEN our storage stack is created
    const stack = new StorageStack(app, "test-stack")

    // THEN we expect it is a dynamo db table with pay per request billing
    const template = Template.fromStack(stack)
    template.hasResourceProperties("AWS::DynamoDB::Table", {
        BillingMode: "PAY_PER_REQUEST"
    })
})