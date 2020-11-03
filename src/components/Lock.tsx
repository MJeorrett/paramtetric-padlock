import React from 'react';
import { withSettings } from './withSettings';

type LockProps = {
  height: number,
  lockedColor: string,
  unlockedColor: string,
  percentageOpen: number,
  maxRotation: number,
  percentageLift: number,
  bodyWidth: number,
  bodyHeight: number,
  shankOutsideWidth: number,
  shankLength: number,
  shankThickness: number,
  shankOpening: number,
}

const Lock: React.FC<LockProps> = ({
  height,
  lockedColor,
  unlockedColor,
  percentageOpen,
  maxRotation: maxRotationDegrees,
  percentageLift,
  bodyWidth,
  bodyHeight,
  shankOutsideWidth,
  shankLength,
  shankThickness,
  shankOpening,
}) => {
  const maxRotation = maxRotationDegrees * (Math.PI / 180);
  const percentageRotation = 100 - percentageLift;
  const rotation = percentageOpen > percentageLift ? ((percentageOpen - percentageLift) / percentageRotation) * maxRotation : 0;

  const shankRadius = (shankOutsideWidth - shankThickness) / 2;
  const shankCenterX = (bodyWidth / 2) - (shankOutsideWidth / 2) + (shankThickness / 2) + bodyWidth;
  const shankEffectiveWidth = (shankRadius * 2) * Math.cos(rotation);
  const rightShankX = shankCenterX + shankEffectiveWidth;
  const shankLift = percentageOpen > percentageLift ? -shankOpening : (percentageOpen / percentageLift) * -shankOpening;
  const shankTopY = (shankThickness / 2) + shankRadius + shankOpening;
  const shankBottomY = shankTopY + shankLength;
  const flip = rotation > Math.PI / 2;

  const pathD = [
    'M', shankCenterX, shankTopY + shankLift,
    'L', shankCenterX, shankBottomY,
    'M', rightShankX, shankTopY + shankLift,
    'L', rightShankX, shankBottomY + shankLift,
    'M', rightShankX, shankTopY + shankLift,
    'A', shankEffectiveWidth / 2, shankRadius, 0, 0, flip ? 1 : 0, shankCenterX, shankTopY + shankLift,
  ];

  const color = percentageOpen === 0 ? lockedColor : unlockedColor;

  return (
    <>
      <svg width={bodyWidth * 2} height={height} style={{ stroke: color, fill: color }}>
        <path d={pathD.join(' ')} fill="none" strokeWidth={shankThickness} />
        <rect x={bodyWidth} y={shankBottomY} width={bodyWidth} height={bodyHeight} />
      </svg>
    </>
  );
};

export default withSettings({
  settings: {
    lockedColor: {
      default: '#1E90FF',
      label: 'Locked Color',
      type: 'color',
    },
    unlockedColor: {
      default: '#444444',
      label: 'Unlocked Color',
      type: 'color',
    },
    percentageOpen: {
      default: 0,
      label: 'Percentage Open',
      min: 0,
      max: 100,
    },
    maxRotation: {
      default: 150,
      label: 'Max Rotation',
      min: 0,
      max: 180,
    },
    percentageLift: {
      default: 10,
      label: 'Percentage Lift',
      min: 1,
      max: 100,
    },
    bodyWidth: {
      default: 50,
      label: 'Body Width',
      min: 2,
      max: 500,
      constraint: (value, settings, setters) => {
        setters.shankOutsideWidth(Math.min(value as number, settings.shankOutsideWidth));
      },
    },
    bodyHeight: {
      default: 40,
      label: 'Body Height',
      max: 500,
    },
    shankOutsideWidth: {
      default: 42,
      label: 'Shank Width',
      max: settings => settings.bodyWidth,
      min: 2,
      constraint: (value, settings, setters) => {
        setters.shankThickness(Math.min((value as number) / 2, settings.shankThickness));
      },
    },
    shankLength: {
      label: 'Shank Length',
      default: 15,
      max: 250,
    },
    shankThickness: {
      label: 'Shank Thickness',
      default: 10,
      max: settings => settings.shankOutsideWidth / 2,
      min: 1,
    },
    shankOpening: {
      label: 'Shank Opening',
      default: 4,
      max: 100,
      min: 1,
    },
  },
})(Lock);
