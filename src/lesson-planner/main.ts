/// <reference types="node" />

import 'rxjs/Rx';
import { app } from 'electron';
import { LessonPlannerApp } from 'lesson-planner/app';

app.on('ready', () => LessonPlannerApp.getInstance().start());
