<?php


namespace Jlbs\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DashboardController extends Controller
{
    public function indexAction()
    {
        return $this->render('JlbsAdminBundle:Dashboard:index.html.twig');
    }
}
