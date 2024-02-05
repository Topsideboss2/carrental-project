# store the terraform state file in s3 and lock with dynamodb
terraform {
  backend "s3" {
    bucket         = "carrental-terraform-remote-state"
    key            = "carrental-app/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "carrental-state-lock"
  }
}
