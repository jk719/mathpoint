# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathPoint is a conceptual diagnosis system for mathematics education, designed to assess students' true conceptual understanding through multi-layered assessments and behavioral data analysis. The application serves grades 2-12 with adaptive math assessments and interactive learning tools.

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Authentication**: Custom context-based auth (AuthContext)
- **UI Components**: Custom components with CSS modules
- **Icons**: React Icons
- **Deployment**: Vercel

## Development Commands

```bash
npm run dev          # Start development server with Vite HMR
npm run build        # TypeScript check + production build
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

## Core Architecture

### Component Structure
The application follows a feature-based component organization:

- **Assessment Components** (`src/components/`):
  - `SmartMC`: Multiple choice with misconception detection
  - `MicroTask`: Drag-drop and categorization tasks
  - `OpenEnded`: Structured open-ended responses
  - `ErrorAnalysis`: Students identify errors in solutions
  - `ConceptMap`: Visual concept relationship mapping
  - `ReasonChoice`: Reasoning selection tasks
  - `Grade2NYQuestions`: Main assessment orchestrator

- **Shared Infrastructure**:
  - `AuthContext`: Authentication state management
  - `useAssessment`: Assessment navigation and state hook
  - `Whiteboard`: Interactive drawing canvas component

### Data Flow Architecture

1. **Assessment Flow**:
   - Questions defined in `questions-grade2-ny.ts`
   - `Grade2NYQuestions` component orchestrates the assessment
   - Each question type component handles specific interaction patterns
   - Behavioral data (time, hesitation, changes) tracked via custom hooks

2. **State Management**:
   - Authentication via React Context (`AuthContext`)
   - Assessment state managed through `useAssessment` hook
   - No external state management library - relies on React's built-in state

3. **Service Layer** (`src/services/`):
   - `apiClient.ts`: Backend API communication
   - `mlClient.ts`: Machine learning model integration
   - `logger.ts`: Event and behavioral data logging

### Key Architectural Decisions

- **No test framework configured** - Testing strategy to be determined
- **Simple authentication** - Currently demo-only, requires production implementation
- **Component-level styling** - Each component has its own CSS file
- **TypeScript strict mode** - Enforced through tsconfig
- **Mobile-first responsive design** - Whiteboard and assessment components optimized for mobile

## Type System

The application uses TypeScript with defined types in `src/types/`:
- `Assessment.ts`: Question and assessment types
- `ConceptGraph.ts`: Knowledge graph structures
- `Event.ts`: User interaction event types

## Deployment Configuration

- Vercel deployment configured (`vercel.json`)
- SPA routing handled via rewrites
- Production builds output to `dist/`