import React from 'react';
import { cn } from '../../../components/primitives/_shared';
import { PhotoHeroBackdrop, type PhotoHeroBackdropProps } from '../../_shared/PhotoHeroBackdrop';
import {
  LOGIN_BRAND_PANEL_CLASS,
  LOGIN_FORM_INNER_CLASS,
  LOGIN_FORM_PANEL_CLASS,
  LOGIN_PAGE_SPLIT_CLASS,
} from '../../_shared/blockLayout';
import { LoginBlock, type LoginBlockProps } from '../LoginBlock';
import { LoginLegalFooter } from '../LoginBlock/LoginLegalFooter';
import { aicadsLoginBrandBackground } from '../demo-assets/aicadsCaseStudyDemoImages';

export interface LoginPageTemplateProps extends LoginBlockProps {
  className?: string;
  /** Left panel photo — defaults to AICADS PRO brand gradient. */
  brandBackgroundImage?: string;
  brandPhotoTone?: PhotoHeroBackdropProps['photoTone'];
  brandGrainIntensity?: PhotoHeroBackdropProps['grainIntensity'];
  brandImageParallaxFactor?: PhotoHeroBackdropProps['imageParallaxFactor'];
}

export const LoginPageTemplate: React.FC<LoginPageTemplateProps> = ({
  className,
  legalLinks,
  brandBackgroundImage = aicadsLoginBrandBackground,
  brandPhotoTone = 'deep',
  brandGrainIntensity = 'strong',
  brandImageParallaxFactor = 0.14,
  ...loginProps
}) => (
  <div className={cn(LOGIN_PAGE_SPLIT_CLASS, className)} aria-label="AICADS PRO login">
    <div className={LOGIN_BRAND_PANEL_CLASS} aria-hidden="true">
      {brandBackgroundImage ? (
        <PhotoHeroBackdrop
          backgroundImageSrc={brandBackgroundImage}
          photoTone={brandPhotoTone}
          grainIntensity={brandGrainIntensity}
          depth="enhanced"
          imageParallaxFactor={brandImageParallaxFactor}
          imageLoading="eager"
        />
      ) : null}
    </div>

    <div className={LOGIN_FORM_PANEL_CLASS}>
      <div className={LOGIN_FORM_INNER_CLASS}>
        <LoginBlock legalLinks={legalLinks} {...loginProps} />
      </div>
      <LoginLegalFooter links={legalLinks} />
    </div>
  </div>
);

LoginPageTemplate.displayName = 'LoginPageTemplate';
