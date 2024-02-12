# environment variables
region       = "us-east-1"
project_name = "carrental"
environment  = "dev"

# vpc variables
vpc_cidr                     = "10.0.0.0/16"
public_subnet_az1_cidr       = "10.0.0.0/24"
public_subnet_az2_cidr       = "10.0.1.0/24"
private_app_subnet_az1_cidr  = "10.0.2.0/24"
private_app_subnet_az2_cidr  = "10.0.3.0/24"
private_data_subnet_az1_cidr = "10.0.4.0/24"
private_data_subnet_az2_cidr = "10.0.5.0/24"

# secrets manager variables
secrets_manager_secret_name = "carrental-dev-secrets"

# rds variables
multi_az_deployment          = "false"
database_instance_identifier = "app-db"
database_instance_class      = "db.t3.micro"
publicly_accessible          = "false"

# acm variables
domain_name       = "topsideboss2.tech"
alternative_names = "carrental.topsideboss2.tech"

# s3 variables
env_file_bucket_name = "topsideboss2-carrental-env-file-bucket"
env_file_name        = "env-variables-file.env"

# ecs variables
architecture = "X86_64"
image_name1   = "carrental-web-app"
image_name2   = "carrental-api-app"
image_name3   = "carrental-redis-app"
image_tag    = "latest"

# route-53 variables
record_name = "carrental"
