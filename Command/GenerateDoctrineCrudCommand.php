<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Jlbs\AdminBundle\Command;

use Jlbs\AdminBundle\Theme\ThemeDoctrineCrudCollectionInterface;
use Sensio\Bundle\GeneratorBundle\Command\GenerateDoctrineCrudCommand as BaseGenerateDoctrineCrudCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\DependencyInjection\Exception\InvalidArgumentException;

/**
 * Generates a CRUD for a Doctrine entity.
 *
 * @author Joe Luis Borrero Senciales <jlborrero@gmail.com>
 */
class GenerateDoctrineCrudCommand extends BaseGenerateDoctrineCrudCommand
{
    protected function configure()
    {
        parent::configure();

        $this
            ->addOption('theme', null, InputOption::VALUE_OPTIONAL, 'The Theme name', 'default')
            ->setName('doctrine:jlbsgenerate:crud')
            ->setAliases(array('jlbs:doctrine:crud'));
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $theme_colletion = $this->getContainer()->get('jlbs_admin.theme.collection');

        if (!$theme_colletion instanceof ThemeDoctrineCrudCollectionInterface) {
            throw new InvalidArgumentException('The service "jlbs_admin.theme.collection" most implements Jlbs\AdminBundle\Theme\ThemeDoctrineCrudCollectionInterface');
        }
        $this->setGenerator($theme_colletion->getTheme($input->getOption('theme'))->getGenerator());
        $this->setFormGenerator($theme_colletion->getTheme($input->getOption('theme'))->getFormGenerator());


        return parent::execute($input, $output);
    }

}
