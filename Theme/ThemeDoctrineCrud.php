<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Alejandro Pérez Cuba <aprezcuba24@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Jlbs\AdminBundle\Theme;

use Jlbs\AdminBundle\Generator\DoctrineCrudGenerator;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Sensio\Bundle\GeneratorBundle\Generator\DoctrineFormGenerator;
use Symfony\Component\DependencyInjection\Exception\InvalidArgumentException;
use Jlbs\AdminBundle\Generator\DoctrineFiterGenerator;

class ThemeDoctrineCrud implements ThemeDoctrineCrudInterface, ContainerAwareInterface
{
    protected $generator;
    protected $container;
    protected $theme_name;
    protected $formGenerator;
    protected $filterFormGenerator;

    public function __construct(ContainerInterface $container, $theme_name)
    {
        $this->setContainer($container);
        $this->theme_name = $theme_name;
    }

    public function getGenerator()
    {
        if (null === $this->generator) {

            $dir_path = $this->skeletonPath() . 'crud';
            if (!file_exists($dir_path)) {
                throw new InvalidArgumentException(sprintf('%s is no directory', $dir_path));
            }

            $this->generator = new DoctrineCrudGenerator($this->getContainer()->get('filesystem'), $dir_path);
            $this->generator->setSkeletonDirs($this->getSkeletonDirs());
        }

        return $this->generator;
    }

    public function getFormGenerator()
    {
        if (null === $this->formGenerator) {

            $dir_path = $this->skeletonPath() . 'form';
            if (!file_exists($dir_path)) {
                throw new InvalidArgumentException(sprintf('%s is no directory', $dir_path));
            }

            $this->formGenerator = new DoctrineFormGenerator($this->getContainer()->get('filesystem'), $dir_path);
        }

        return $this->formGenerator;
    }

    protected function skeletonPath()
    {
        $part_name = explode(':', $this->theme_name);
        if (count($part_name) != 2) {
            throw new InvalidArgumentException('The thene name most similar to JlbsAdminBundle:default');
        }

        $bundle = $this->getContainer()->get('kernel')->getBundle($part_name[0]);

        $dir_path = $bundle->getPath() . sprintf('/Resources/skeleton/%s/', $part_name[1]);
        if (!file_exists($dir_path)) {
            throw new InvalidArgumentException(sprintf('%s is no directory', $dir_path));
        }

        return $dir_path;
    }

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function getContainer()
    {
        return $this->container;
    }

    protected function getSkeletonDirs()
    {

        $part_name = explode(':', $this->theme_name);
        $bundle = $this->getContainer()->get('kernel')->getBundle($part_name[0]);
        $skeletonDirs = array();

        if (isset($bundle) && is_dir($dir = $bundle->getPath() . sprintf('/Resources/skeleton/%s/', $part_name[1]))) {
            $skeletonDirs[] = $dir;
        }

        if (is_dir(
            $dir = $this->getContainer()->get('kernel')->getRootdir() . sprintf(
                    '/Resources/skeleton/%s/',
                    $part_name[1]
                )
        )
        ) {
            $skeletonDirs[] = $dir;
        }

        $skeletonDirs[] = __DIR__ . '/../Resources/skeleton';
        $skeletonDirs[] = __DIR__ . '/../Resources';

        return $skeletonDirs;
    }
}