# store the terraform state file in s3 and lock with dynamodb
terraform {
  backend "s3" {
    bucket         = "topsideboss2-terraform-remote-state"
    key            = "carrental-app/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
  }
}
