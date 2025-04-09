import type { ApplicationStatus, ContentStatus, DashboardMenu, ErrorType, StatusAction, StatusOption, StatusVariants } from '~/types';

export const ERROR_LIST: ErrorType[] = [
    {
        statusCode: 404,
        title: 'Page not found',
        heading: 'Sorry, We Can\'t Find That Page',
        description: 'We couldn\'t find the page you were looking for. It may have been moved or no longer exists. Let\'s get you back on track. Click below to return to the homepage.',
    },
    {
        statusCode: 500,
        title: 'Internal server error',
        heading: 'Sorry, Unexpected Error Occurred',
        description: 'Something went wrong on our end. We\'re working to fix it as soon as possible. Let\'s get you back on track. Click below to return to the homepage.',
    },
] as const;

export const DASHBOARD_MENUS: DashboardMenu[] = [
    {
        name: 'Dashboard',
        requireAdmin: false,
        children: [
            {
                name: 'Dashboard',
                hrefName: 'index',
                path: '/',
                icon: 'lucide:gauge',
            },
        ],
    },
] as const;

export const STATUS_VARIANTS: Record<ContentStatus, StatusVariants> = {
    DRAFT: 'warning',
    PUBLISHED: 'success',
    ARCHIVED: 'danger',
} as const;

export const APPLICATION_STATUS_VARIANTS: Record<ApplicationStatus, StatusVariants> = {
    ACCEPTED: 'success',
    INTERVIEWING: 'info',
    OFFERED: 'indigo',
    REJECTED: 'danger',
    REVIEWED: 'warning',
    TECHNICAL_TEST: 'pink',
    SUBMITTED: 'primary',
} as const;

export const APPLICATION_STATUS = {
    SUBMITTED: 'SUBMITTED',
    REVIEWED: 'REVIEWED',
    REJECTED: 'REJECTED',
    TECHNICAL_TEST: 'TECHNICAL_TEST',
    INTERVIEWING: 'INTERVIEWING',
    OFFERED: 'OFFERED',
    ACCEPTED: 'ACCEPTED',
} as const;

export const STATUS_ACTIONS: Record<ContentStatus, readonly StatusAction[]> = {
    PUBLISHED: [
        {
            label: 'Archive',
            name: 'ARCHIVED',
            variant: STATUS_VARIANTS.ARCHIVED,
            icon: 'lucide:archive',
        },
    ],
    ARCHIVED: [
        {
            label: 'Publish',
            name: 'PUBLISHED',
            variant: 'primary',
            icon: 'lucide:circle-plus',
        },
    ],
    DRAFT: [
        {
            label: 'Publish',
            name: 'PUBLISHED',
            variant: 'primary',
            icon: 'lucide:circle-plus',
        },
    ],
} as const;

export const STATUS_OPTIONS: StatusOption[] = [
    { label: 'Reviewed', value: 'REVIEWED' },
    { label: 'Technical Test', value: 'TECHNICAL_TEST' },
    { label: 'Interviewed', value: 'INTERVIEWING' },
    { label: 'Offering', value: 'OFFERED' },
    { label: 'Pass', value: 'ACCEPTED' },
];

export const CONTENT_TEMPLATE = {
    STUDY_CASE: {
        SUMMARY: `
            <div class="prose-custom relative">
                <div contenteditable="true" translate="no" tabindex="0">
                    <p>
                        <strong>(Short study case summary description)</strong>
                        <br />
                        <strong>(Example)</strong>
                        PT. ICON, a fast-growing logistics company, struggled with inefficiencies in manual container booking, tracking, and loading, causing scheduling issues and reduced transparency. To restore customer trust and streamline operations, they launched a comprehensive digital transformation.
                    </p>
                    <div data-type="columnBlock" class="column-block">
                        <div data-type="column" class="column">
                            <div style="display: flex;" contenteditable="false" draggable="true">
                                <div style="width: 100%; height: auto; cursor: pointer;">
                                    <img src="/images/no-image.jpg" style="width: 100%; height: auto; cursor: pointer;" draggable="true" />
                                </div>
                            </div>
                        </div>
                        <div data-type="column" class="column">
                            <p>
                                <strong>(Subtitle)</strong>
                            </p>
                            <p>
                                <strong>(Short study case summary description)</strong>
                                <br />
                                <strong>(Example)</strong>
                                We led the project from initial planning and requirement analysis to full-scale production and deployment, with our team responsible for both front-end and back-end development.
                            </p>
                        </div>
                    </div>
                    <div data-type="columnBlock" class="column-block">
                        <div data-type="column" class="column">
                            <p>
                                <strong>(Subtitle)</strong>
                            </p>
                            <p>
                                <strong>(Short study case summary description)</strong>
                                <br />
                                <strong>(Example)</strong>
                                We led the project from initial planning and requirement analysis to full-scale production and deployment, with our team responsible for both front-end and back-end development.
                            </p>
                        </div>
                        <div data-type="column" class="column">
                            <div style="display: flex;" contenteditable="false" draggable="true">
                                <div style="width: 100%; height: auto; cursor: pointer;">
                                    <img src="/images/no-image.jpg" style="width: 100%; height: auto; cursor: pointer;" draggable="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p><br class="ProseMirror-trailingBreak"></p>
                </div>
            </div>
        `,
        DOWNLOAD: `
            <div contenteditable="true" translate="no" tabindex="0">
                <p>
                    <strong>(Study case detail description)</strong>
                    <br />
                    <strong>(Example)</strong>
                    PT. ICON is a rapidly growing logistics company that faces major operational challenges. Manual systems in container booking, shipment tracking, and loading and unloading processes create chaos that threatens the company's reputation.
                </p>
                <p>
                    <span style="font-size: 12px; color: rgb(140, 123, 13)">[PAINT POINT] </span><br />
                    <strong>(Study case paint point description)</strong>
                    <br />
                    <strong>(Example)</strong>
                    This new system has a long process and collaboration between teams, by conducting a discovery phase process that we do together by involving all stakeholders from customers, operators, marketing, to BOD, we conclude several pain points such as:
                </p>
                <ul>
                    <li>
                        <p>Booking containers manually takes a long time and often results in overlapping schedules.</p>
                    </li>
                    <li>
                        <p>Non-transparent container tracking makes it impossible for clients to monitor the position and status of shipments.</p>
                    </li>
                </ul>
                <div style="display: flex; margin: 1rem 0;" contenteditable="false" draggable="true">
                    <div style="width: 100%; height: auto; cursor: pointer;">
                        <img
                            src="/images/no-image.jpg"
                            style="width: 100%; height: auto; cursor: pointer;"
                            draggable="true"
                        />
                    </div>
                </div>
                <p>
                    <span style="font-size: 12px; color: rgb(140, 123, 13)">[CHALLENGE] </span><br />
                    <strong>(Study case challenge description)</strong>
                    <br />
                    <strong>(Example)</strong>
                    We also create a customized user experience for each client and internal target end-to-end. This innovation process requires good and structured collaboration because the system built will be implemented in various branches in Indonesia with uniform business standards.
                </p>
                <ul>
                    <li>
                        <p>Booking containers manually takes a long time and often results in overlapping schedules.</p>
                    </li>
                    <li>
                        <p>Non-transparent container tracking makes it impossible for clients to monitor the position and status of shipments.</p>
                    </li>
                </ul>
                <div style="display: flex; margin: 1rem 0;" contenteditable="false" draggable="true">
                    <div style="width: 100%; height: auto; cursor: pointer;">
                        <img
                            src="/images/no-image.jpg"
                            style="width: 100%; height: auto; cursor: pointer;"
                            draggable="true"
                        />
                    </div>
                </div>
                <p>
                    <span style="font-size: 12px; color: rgb(148, 129, 10)">[STRATEGY AND APPROACH] </span><br />
                    <strong>(Study case strategy and approach description)</strong>
                    <br />
                    <strong>(Example)</strong>
                    We also create a customized user experience for each client and internal target end-to-end. This innovation process requires good and structured collaboration because the system built will be implemented in various branches in Indonesia with uniform business standards.
                </p>
                <div style="display: flex; margin: 1rem 0;" contenteditable="false" draggable="true">
                    <div style="width: 100%; height: auto; cursor: pointer;">
                        <img
                            src="/images/no-image.jpg"
                            style="width: 100%; height: auto; cursor: pointer;"
                            draggable="true"
                        />
                    </div>
                </div>
                <p>
                    <span style="font-size: 12px; color: rgb(148, 129, 10)">[TECHNOLOGY STACK] </span><br />
                    <strong>(Study case technology stack description)</strong>
                    <br />
                    <strong>(Example)</strong>
                    We use the latest technology stack such as React, Next.js, and Tailwind CSS to build and deploy the system.
                </p>
                <p>
                    <span style="font-size: 12px; color: rgb(148, 129, 10)">[IMPACT] </span><br />
                    <strong>(Study case impact description)</strong>
                    <br />
                    <strong>(Example)</strong>
                    Improving product and business sustainability
                </p>
                <div style="display: flex; margin: 1rem 0;" contenteditable="false" draggable="true">
                    <div style="width: 100%; height: auto; cursor: pointer;">
                        <img
                            src="/images/no-image.jpg"
                            style="width: 100%; height: auto; cursor: pointer;"
                            draggable="true"
                        />
                    </div>
                </div>
            </div>
        </div>
        <p></p>
        `,
    },
    BLOG: {
        PREVIEW: `
            <h4>Introduction</h4>
            <p>
                <strong>(Introduction about blog content)</strong><br>
                <strong>(Example)</strong> Many-to-many relationships are a fundamental part of relational database design, and Hibernate makes it seem easy to map them to your Java objects. However, those seemingly simple annotations can quickly lead to performance bottlenecks, perplexing bugs, and a tangled web of code. If you've ever wrestled with these issues, you're not alone. In this post, we'll reveal four crucial secrets to mastering many-to-many relationships in Hibernate, ensuring your applications are robust, efficient, and maintainable.
            </p>
            <ol>
                <li>
                    <p><strong>Bidirectional Sync - The Guardian of Data Integrity</strong></p>
                    <ul>
                        <li>
                            <p><strong><em>The Problem:</em></strong> Without proper synchronization, you can end up with inconsistent data in your join table. For instance, you might add a Book to an Author's collection, but forgot to add the Author to the Book's collection. This can lead to unexpected behavior and data discrepancies.</p>
                        </li>
                        <li>
                            <p><strong><em>The Solution: </em></strong>Implement helper methods to ensure both sides of the relationship are always in sync.</p>
                        </li>
                    </ul>
                </li>
            </ol>
            <p>
                <div style="display: flex;" contenteditable="false" draggable="true" class="">
                    <div style="position: relative; width: 100%; height: auto; cursor: pointer;">
                        <img src="/images/no-image.jpg" style="width: 100%; height: auto; cursor: pointer;" draggable="true">
                    </div>
                </div>
            </p>
            <ol start="2">
                <li>
                    <p><strong>Cascade Control – Precision, Not Destruction</strong></p>
                    <p><strong><em>The Problem:</em></strong> Without proper synchronization, you can end up with inconsistent data in your join table. For instance, you might add a Book to an Author's collection, but forgot to add the Author to the Book's collection. This can lead to unexpected behavior and data discrepancies.</p>
                    <p><strong><em>The Solution: </em></strong>Implement helper methods to ensure both sides of the relationship are always in sync.</p>
                </li>
            </ol>
            <p>
                <div style="display: flex;" contenteditable="false" draggable="true" class="">
                    <div style="position: relative; width: 100%; height: auto; cursor: pointer;">
                        <img src="/images/no-image.jpg" style="width: 100%; height: auto; cursor: pointer;" draggable="true">
                    </div>
                </div>
            </p>
            <ol start="3">
                <li>
                    <p><strong>Lazy Loading – The Performance Savior</strong></p>
                    <p><strong><em>The Problem:</em></strong> Without proper synchronization, you can end up with inconsistent data in your join table. For instance, you might add a Book to an Author's collection, but forgot to add the Author to the Book's collection. This can lead to unexpected behavior and data discrepancies.</p>
                    <p><strong><em>The Solution: </em></strong>Implement helper methods to ensure both sides of the relationship are always in sync.</p>
                </li>
            </ol>
            <p>
                <div style="display: flex;" contenteditable="false" draggable="true" class="">
                    <div style="position: relative; width: 100%; height: auto; cursor: pointer;">
                        <img src="/images/no-image.jpg" style="width: 100%; height: auto; cursor: pointer;" draggable="true">
                    </div>
                </div>
            </p>
            <ol start="4">
                <li>
                    <p><strong>Lazy Loading – The Performance Savior</strong></p>
                    <p><strong><em>The Problem:</em></strong> Without proper synchronization, you can end up with inconsistent data in your join table. For instance, you might add a Book to an Author's collection, but forgot to add the Author to the Book's collection. This can lead to unexpected behavior and data discrepancies.</p>
                    <p><strong><em>The Solution: </em></strong>Implement helper methods to ensure both sides of the relationship are always in sync.</p>
                </li>
            </ol>
            <p>
                <div style="display: flex;" contenteditable="false" draggable="true">
                    <div style="width: 100%; height: auto; cursor: pointer;">
                        <img src="/images/no-image.jpg" style="width: 100%; height: auto; cursor: pointer;" draggable="true">
                    </div>
                </div>
            </p>
            <p><strong>Conclusion:</strong><br>Mastering many-to-many relationships in Hibernate requires careful consideration of data synchronization, cascade types, fetching strategies, and collection types. By implementing these four secrets, you can build efficient, reliable, and maintainable applications. Remember to always test your relationships thoroughly and profile your application to identify potential performance bottlenecks.</p>
            <p><strong>View our video in YouTube</strong></p>
            <p>
                <div data-youtube-video="" contenteditable="false" draggable="true" class="">
                    <iframe width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="true" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube.com/watch?v=AUv3I_Zy9NU" start="0"></iframe>
                </div>
            </p>
        `,
    },
    JOB_POSTING: {
        PREVIEW: `
            <h4>Job Description</h4>

            <p>
                <strong>(Example)</strong>
                <br />
                Our Graduate Engineer Trainee Program focuses on collaboration and teamwork in a self-organizing environment. Trainees participate in sharing sessions and activities to learn from experienced professionals and discuss best practices.
            </p>

            <h4>Requirement</h4>

            <ul>
                <li>
                    <p>
                        <strong>(Example)</strong>
                        <br />
                        Must have 3 to 4 years of experience in programming in Objective-C
                    </p>
                </li>

                <li>
                    <p>
                        <strong>(Example)</strong>
                        <br />
                        Solid exposure to object oriented design patterns and multi-threading
                    </p>
                </li>
            </ul>

            <h4>Rewards and Benefits</h4>

            <ul>
                <li>
                    <p>
                        <strong>(Example)</strong>
                        <br />
                        Competitive salary (compensation will be based on experience)
                    </p>
                </li>

                <li>
                    <p>
                        <strong>(Example)</strong>
                        <br />
                        A fun and a fast paced culture which promotes learning and knowledge sharing
                    </p>
                </li>
            </ul>
        `,
    },
};
