import React, { useEffect, useState } from 'react';
import { cn } from '../../../components/primitives/_shared';
import { Drawer } from '../../../components/primitives/Drawer';
import { Link } from '../../../components/primitives/Link';
import { BlockAction } from '../../_shared/BlockAction';
import type {
  NavbarBlockProps,
  NavbarLink,
  NavbarServiceCategory,
  NavbarSocialLink,
} from './NavbarBlock.types';
import { ChevronDownIcon, SOCIAL_ICON_MAP } from './NavbarIcons';

export interface NavbarMobileMenuProps {
  open: boolean;
  onClose: () => void;
  logo: React.ReactNode;
  links: NavbarLink[];
  servicesMenu?: NavbarServiceCategory[];
  servicesTriggerLabel?: string;
  socialLinks?: NavbarSocialLink[];
  phone?: NavbarBlockProps['phone'];
  cta?: NavbarBlockProps['cta'];
  accountCta?: NavbarBlockProps['accountCta'];
}

export const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({
  open,
  onClose,
  logo,
  links,
  servicesMenu = [],
  servicesTriggerLabel,
  socialLinks = [],
  phone,
  cta,
  accountCta,
}) => {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(servicesMenu[0]?.id ?? '');

  const triggerLabel =
    servicesTriggerLabel ?? links.find((l) => l.megaMenu)?.label ?? 'Компоненты';

  const plainLinks = links.filter((l) => !l.megaMenu && l.label !== triggerLabel);
  const activeServices = servicesMenu.find((c) => c.id === activeCategory);

  useEffect(() => {
    if (open && servicesMenu.length > 0) {
      setServicesExpanded(true);
      setActiveCategory(servicesMenu[0]?.id ?? '');
      return;
    }
    if (!open) {
      setServicesExpanded(false);
      setActiveCategory(servicesMenu[0]?.id ?? '');
    }
  }, [open, servicesMenu]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="right"
      size="lg"
      title={typeof logo === 'string' ? logo : 'Menu'}
      className="!w-full !max-w-none [&>div:first-child]:min-h-[var(--space-56)] [&>div:first-child]:px-[var(--space-grid-mobile-offset)] [&>div:last-child]:p-[var(--space-grid-mobile-offset)]"
    >
      <div className="flex min-h-full flex-col gap-[var(--space-section-content-xl)] pb-[var(--space-section-y-s)]">
        {servicesMenu.length > 0 ? (
          <section className="border-b border-[var(--color-border-base)] pb-[var(--space-section-content-l)]">
            <button
              type="button"
              className={cn(
                'flex w-full min-h-[var(--space-56)] items-center justify-between gap-[var(--space-section-stack-m)]',
                'py-[var(--space-section-content-s)] text-left',
                'text-style-h4 font-semibold text-[var(--color-text-primary)]',
              )}
              aria-expanded={servicesExpanded}
              onClick={() => setServicesExpanded((v) => !v)}
            >
              {triggerLabel}
              <span className="flex h-[var(--space-24)] w-[var(--space-24)] shrink-0 items-center justify-center">
                <ChevronDownIcon
                  className={cn('transition-transform duration-200', servicesExpanded && 'rotate-180')}
                />
              </span>
            </button>

            {servicesExpanded ? (
              <div className="flex flex-col gap-[var(--space-section-content-l)]">
                <ul
                  className="flex flex-col gap-[var(--space-section-stack-s)]"
                  role="tablist"
                  aria-label="Service categories"
                >
                  {servicesMenu.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeCategory === cat.id}
                        className={cn(
                          'flex w-full min-h-[var(--space-48)] items-center rounded-[var(--radius-medium)]',
                          'px-[var(--space-section-content-m)] py-[var(--space-section-content-s)]',
                          'text-left text-style-body font-medium transition-colors duration-200',
                          activeCategory === cat.id
                            ? 'bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)]'
                            : 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)]',
                        )}
                        onClick={() => setActiveCategory(cat.id)}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>

                {activeServices ? (
                  <ul className="flex flex-col gap-[var(--space-section-stack-l)]">
                    {activeServices.items.map((item) => (
                      <li key={item.href} className="min-w-0">
                        <Link
                          href={item.href}
                          size="lg"
                          showRightIcon={false}
                          className="block w-full py-[var(--space-2)] no-underline"
                        >
                          {item.label}
                        </Link>
                        {item.description ? (
                          <p className="mt-[var(--space-2)] text-style-body-sm text-[var(--color-text-secondary)]">
                            {item.description}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </section>
        ) : null}

        {plainLinks.length > 0 ? (
          <nav
            className="flex flex-col gap-[var(--space-section-stack-l)]"
            aria-label="Primary"
          >
            {plainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href ?? '#'}
                size="lg"
                showRightIcon={false}
                className="min-h-[var(--space-48)] items-center py-[var(--space-2)] no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}

        {phone ? (
          <div className="flex flex-col gap-[var(--space-section-stack-s)] border-t border-[var(--color-border-base)] pt-[var(--space-section-content-l)]">
            <a
              href={phone.href ?? `tel:${phone.number.replace(/\s/g, '')}`}
              className="text-style-h4 font-semibold text-[var(--color-text-primary)] no-underline"
            >
              {phone.number}
            </a>
            {phone.status ? (
              <a
                href={phone.status.href}
                className="inline-flex min-h-[var(--space-36)] items-center gap-[var(--space-section-stack-s)] text-style-body text-[var(--color-text-secondary)] no-underline"
              >
                <span
                  className="h-[var(--space-8)] w-[var(--space-8)] shrink-0 rounded-full bg-[var(--color-success-primary)]"
                  aria-hidden="true"
                />
                {phone.status.label}
              </a>
            ) : null}
          </div>
        ) : null}

        {socialLinks.length > 0 ? (
          <ul className="flex flex-wrap gap-[var(--space-section-stack-l)]">
            {socialLinks.map((item) => {
              const Icon = SOCIAL_ICON_MAP[item.icon];
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="flex h-[var(--space-48)] w-[var(--space-48)] items-center justify-center text-[var(--color-text-primary)] transition-opacity duration-200 hover:opacity-80"
                  >
                    <span className="flex h-[var(--space-28)] w-[var(--space-28)] items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                      {Icon ? <Icon /> : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}

        {accountCta || cta ? (
          <div className="mt-auto flex flex-col gap-[var(--space-section-stack-l)] border-t border-[var(--color-border-base)] pt-[var(--space-section-content-l)]">
            {accountCta ? (
              <BlockAction
                label={accountCta.label}
                href={accountCta.href}
                onClick={() => {
                  accountCta.onClick?.();
                  onClose();
                }}
                appearance="outline"
                size="lg"
                className="w-full justify-center"
              />
            ) : null}
            {cta ? (
              <BlockAction
                label={cta.label}
                href={cta.href}
                onClick={() => {
                  cta.onClick?.();
                  onClose();
                }}
                appearance="brand"
                size="lg"
                className="w-full justify-center"
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </Drawer>
  );
};

NavbarMobileMenu.displayName = 'NavbarMobileMenu';
