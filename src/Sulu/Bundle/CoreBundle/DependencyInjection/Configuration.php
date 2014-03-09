<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\CoreBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\NodeBuilder;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritDoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('sulu_core');

        $children = $rootNode->children();
        $this->getPhpcrConfiguration($children);
        $this->getContentConfiguration($children);
        $this->getPortalConfiguration($children);
        $this->getFieldsConfiguration($children);
        $children->end();

        return $treeBuilder;
    }

    /**
     * @param NodeBuilder $rootNode
     */
    private function getPortalConfiguration(NodeBuilder $rootNode)
    {
        $rootNode->arrayNode('portal')
            ->children()
                ->scalarNode('config_dir')
                    ->defaultValue('%kernel.root_dir%/../Resources/portals')
                ->end()
            ->end()
        ->end();
    }

    /**
     * @param NodeBuilder $rootNode
     */
    private function getPhpcrConfiguration(NodeBuilder $rootNode)
    {
        $rootNode->arrayNode('phpcr')
            ->children()
                ->scalarNode('factory_class')
                    ->defaultValue('Jackalope\RepositoryFactoryJackrabbit')
                ->end()
                ->scalarNode('url')
                    ->defaultValue('http://localhost:8080/server')
                ->end()
                ->scalarNode('username')
                    ->defaultValue('admin')
                ->end()
                ->scalarNode('password')
                    ->defaultValue('admin')
                ->end()
                ->scalarNode('workspace')
                    ->defaultValue('default')
                ->end()
            ->end()
        ->end();
    }

    /**
     * @param NodeBuilder $rootNode
     */
    private function getFieldsConfiguration(NodeBuilder $rootNode)
    {
        $rootNode->arrayNode('fields_defaults')
            ->addDefaultsIfNotSet()
            ->children()
                ->arrayNode('translations')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('id')->defaultValue('public.id')->end()
                        ->scalarNode('title')->defaultValue('public.title')->end()
                        ->scalarNode('name')->defaultValue('public.name')->end()
                        ->scalarNode('created')->defaultValue('public.created')->end()
                        ->scalarNode('changed')->defaultValue('public.changed')->end()
                    ->end()
                ->end()
                ->arrayNode('widths')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('id')->defaultValue('50px')->end()
                        ->scalarNode('created')->defaultValue('140px')->end()
                        ->scalarNode('changed')->defaultValue('140px')->end()
                    ->end()
                ->end()
            ->end()
        ->end();
    }

    /**
     * @param NodeBuilder $rootNode
     */
    private function getContentConfiguration(NodeBuilder $rootNode)
    {
        $rootNode->arrayNode('content')
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('default_template')
                    ->defaultValue('overview')
                ->end()
                ->arrayNode('language')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('namespace')
                            ->defaultValue('sulu_locale')
                        ->end()
                        ->scalarNode('default')
                            ->defaultValue('en')
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('node_names')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('base')
                            ->defaultValue('cmf')
                        ->end()
                        ->scalarNode('content')
                            ->defaultValue('contents')
                        ->end()
                        ->scalarNode('route')
                            ->defaultValue('routes')
                        ->end()
                    ->end()
                ->end()
                ->scalarNode('type_prefix')
                    ->defaultValue('sulu.content.type.')
                ->end()
                ->arrayNode('types')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->arrayNode('text_line')
                            ->addDefaultsIfNotSet()
                            ->children()
                                ->scalarNode('template')
                                    ->defaultValue('SuluContentBundle:Template:content-types/text_line.html.twig')
                                ->end()
                            ->end()
                        ->end()
                        ->arrayNode('text_area')
                            ->addDefaultsIfNotSet()
                            ->children()
                                ->scalarNode('template')
                                    ->defaultValue('SuluContentBundle:Template:content-types/text_area.html.twig')
                                ->end()
                            ->end()
                        ->end()
                        ->arrayNode('text_editor')
                            ->addDefaultsIfNotSet()
                            ->children()
                                ->scalarNode('template')
                                    ->defaultValue('SuluContentBundle:Template:content-types/text_editor.html.twig')
                                ->end()
                            ->end()
                        ->end()
                        ->arrayNode('resource_locator')
                            ->addDefaultsIfNotSet()
                            ->children()
                                ->scalarNode('template')
                                    ->defaultValue('SuluContentBundle:Template:content-types/resource_locator.html.twig')
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('templates')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('default_path')
                            ->defaultValue('%kernel.root_dir%/../Resources/templates')
                        ->end()
                    ->end()
                ->end()
            ->end()
        ->end();
    }
}
