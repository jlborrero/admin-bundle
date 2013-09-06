<?php


namespace Jlbs\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller as BaseController;

class DashboardController extends BaseController
{
    public function indexAction()
    {
        return $this->render('JlbsAdminBundle:Dashboard:index.html.twig');
    }
}
