Installation
============

Prerequisites
-------------
Required
        "knplabs/knp-paginator-bundle": "dev-master",
        "knplabs/knp-menu-bundle": "@dev",
        "mopa/bootstrap-bundle": "@dev",
        "friendsofsymfony/jsrouting-bundle": "1.1.*",
        "leafo/lessphp": "dev-master"



Installation
------------

1. Add this bundle to your project in composer.json:

    1.2. Plain Admin
    Symfony 2.3 uses composer (http://www.getcomposer.org) to organize dependencies:

    ```json
    {
        "require": {
            "jlbs/admin-bundle": "dev-master",
        }
    }
    1.2. AdminBundle and twitters bootstrap

    To have composer managing twitters bootstrap too, you can either run it with
    --install-suggests or add the following to your composer.json:

    ```json
    {
        "require": {
            "jlbs/admin-bundle": "dev-master",
            "twbs/bootstrap": "dev-master"
        }
    }
    1.2.1. ln -s vendor/twitter/bootstrap/ web/

    1.2. AdminBundle, twitters bootstrap and further suggests

        ```json
        {
            "require": {
                "jlbs/admin-bundle": "dev-master",
                "twbs/bootstrap": "dev-master"
                "knplabs/knp-paginator-bundle": "dev-master",
                "knplabs/knp-menu-bundle": "@dev",
                "mopa/bootstrap-bundle": "@dev",
                "friendsofsymfony/jsrouting-bundle": "1.1.*",
                "leafo/lessphp": "dev-master"
            }
        }
        1.2.1. ln -s vendor/twitter/bootstrap/ web/

2. Add this bundle to your app/AppKernel.php:

    ``` php
    // application/ApplicationKernel.php
    public function registerBundles()
    {
        return array(
            // ...
                  new Jlbs\AdminBundle\JlbsAdminBundle(),
            // ...
        );
    }

