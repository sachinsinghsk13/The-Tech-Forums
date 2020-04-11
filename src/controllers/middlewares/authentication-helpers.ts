export function sessionProviderForViews(req: any, res: any, next: any) {
    if (req.session) {
        res.locals.session = req.session;
    }
    next();
}