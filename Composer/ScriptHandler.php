<?php
/**
 * Script for composer, to symlink bootstrap lib into Bundle
 *
 * Maybe nice to convert this to a command and then reuse command in here.
 */
namespace Jlbs\AdminBundle\Composer;

use Composer\Script\Event;
use Mopa\Bridge\Composer\Util\ComposerPathFinder;
use Mopa\Bundle\BootstrapBundle\Command\BootstrapSymlinkLessCommand;
use Mopa\Bundle\BootstrapBundle\Command\BootstrapSymlinkSassCommand;

class ScriptHandler
{

    public static function postInstallSymlinkTwitterBootstrap(Event $event)
    {
        $IO = $event->getIO();
        $composer = $event->getComposer();
        $cmanager = new ComposerPathFinder($composer);
        $options = array(
            'targetSuffix' => DIRECTORY_SEPARATOR . "web" . DIRECTORY_SEPARATOR . "bootstrap",
            'sourcePrefix' => '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR
        );
        list($symlinkTarget, $symlinkName) = $cmanager->getSymlinkFromComposer(
            BootstrapSymlinkLessCommand::$mopaBootstrapBundleName,
            BootstrapSymlinkLessCommand::$twitterBootstrapName,
            $options
        );

        $IO->write("Checking Symlink", FALSE);
        if (false === BootstrapSymlinkLessCommand::checkSymlink($symlinkTarget, $symlinkName, true)) {
            $IO->write("Creating Symlink: " . $symlinkName, FALSE);
            BootstrapSymlinkLessCommand::createSymlink($symlinkTarget, $symlinkName);
        }
        $IO->write(" ... <info>OK</info>");
    }
}
