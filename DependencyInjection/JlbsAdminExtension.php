<?php

namespace Jlbs\AdminBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class JlbsAdminExtension extends Extension
{
    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.xml');
        
        $this->complileThemeColletions($container);
        
        $container->setParameter('jlbs.admin.list_cant', 10);
        
       // $container->setParameter('jlbs.admin.admin_menu', 'admin_menu');
    }
    
    protected function complileThemeColletions(ContainerBuilder $container)
    {
        $items = array();
        
        foreach ($container->findTaggedServiceIds('jlbs_admin.theme') as $serviceId => $tag) {
            $alias = isset($tag[0]['alias'])
                ? $tag[0]['alias']
                : $serviceId;
            
            $items[$alias] = $serviceId;
        }
        
        $container->getDefinition('jlbs_admin.theme.collection')->replaceArgument(1, $items);
    }
}
