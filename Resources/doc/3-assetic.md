``` yml
# app/config/config.yml

assetic:
    debug:          %kernel.debug%
    use_controller: false
    bundles:        [JlbsAdminFOSUserBundle,JlbsAdminBundle]
    #java: /usr/bin/java
    filters:
        cssrewrite: ~
#        less: ~
        lessphp:
            file: %kernel.root_dir%/../vendor/leafo/lessphp/lessc.inc.php
            apply_to: "\.less$"
        cssembed:
            jar: %kernel.root_dir%/Resources/java/cssembed-0.4.5.jar
        yui_css:
            jar: %kernel.root_dir%/Resources/java/yuicompressor-2.4.7.jar
        yui_js:
            jar: %kernel.root_dir%/Resources/java/yuicompressor-2.4.7.jar