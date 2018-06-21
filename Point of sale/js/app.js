$(() => {
    const app = Sammy('#container', function () {

        this.use('Handlebars', 'hbs');

        this.get('index.html', (ctx) => {

            ctx.loadPartials({
                welcomeText: './templates/common/welcomeText.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/forms/loginForm.hbs',
                registerForm: './templates/forms/registerForm.hbs',
            }).then(function () {
                this.partial('./templates/views/welcomeView.hbs');
            })

        });

        this.post('index.html', (ctx) => {


            let form = ctx.target.id;

            if (form === 'login-form') {

                let loginUsername = $('#username-login').val();
                let loginPassword = $('#password-login').val();



                if (loginUsername === '' || loginPassword === '') {
                    notify.showError('All fields should be non-empty!');
                } else {
                    auth.login(loginUsername, loginPassword)
                        .then((userData) => {
                            auth.saveSession(userData);
                            notify.showInfo('Login successful.');

                            if(localStorage.receiptId === undefined)
                            {
                                
                                receiptService.createReceipt(sessionStorage.getItem('userId'), 'true', 0, 0)
                                .then((receipt) =>  {
        
                                    localStorage.receiptId = receipt._id;
                                    setTimeout(function(){
                                        ctx.redirect('#/');
                                    },1000)
                                    
                                });
                            }


                            ctx.redirect('#/home');
                        })
                        .catch(notify.handleError);

                }
            }
            else if (form === 'register-form') {
               
                let registerUsername = $('#username-register').val();
                let registerPassword = $('#password-register').val();
                let registerRepeatPass = $('#password-register-check').val();


                if (registerUsername.toString().length < 5) {
                    notify.showError('Username should be at least 5 characters long!')
                } else if (registerRepeatPass === '' || registerPassword === '') {
                    notify.showError('Password should not be empty!');
                } else if (registerRepeatPass !== registerPassword) {
                    notify.showError('Passwords must match!');
                } else {
                    auth.register(registerUsername, registerPassword)
                        .then((userData) => {
                            auth.saveSession(userData);
                            
                            notify.showInfo('User registration successful!');

                            
                            ctx.redirect('#/home');
                            
                        })
                        .catch(notify.handleError);
                }


            }

        });

        this.get('#/logout', (ctx) => {

            if (!auth.isAuth()) {
                ctx.redirect('#index.html');
                return;
            }

            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    notify.showInfo('Logout successful.');
                    ctx.redirect('index.html');
                })
                .catch(notify.handleError);
        });

        this.get('#/home', (ctx) => {

            if (!auth.isAuth()) {
                ctx.redirect('#index.html');
                return;
            }
            ctx.username = sessionStorage.getItem('username');

            receiptService.getMyActiveReceipt()
                .then((activeReceipt) => {

                    let receipt = activeReceipt[0];
                    let totalSum = 0;

                    if(receipt === undefined)
                    {
                        
                        receiptService.createReceipt(sessionStorage.getItem('userId'), 'true', 0, 0)
                        .then((receipt) =>  {

                            localStorage.receiptId = receipt._id;
                            setTimeout(function(){
                                ctx.redirect('#/');
                            },1000)
                            
                        });
                    }
                    
                    let receiptId = receipt._id;
                    

                    entryService.getEntriesReceiptById(receiptId)
                        .then((entries) => {
                            ctx.entries = entries;

                            if(entries.length === 0)
                            {
                                ctx.loadPartials({
                                    header: './templates/common/header.hbs',
                                    footer: './templates/common/footer.hbs',
                                    navigation: './templates/common/navigation.hbs',
                                    entry: './templates/entries/entry.hbs',
                                    createColumnForm: './templates/forms/createColumnForm.hbs',
                                    createReceiptForm: './templates/forms/createReceiptForm.hbs',
                                }).then(function () {
                                    this.partial('./templates/views/homeView.hbs');
                                })
                            }

                            entries.forEach((entr, i) => {
                              
                                entr.total = entr.quantity * entr.price;
                                ctx.entry = entr;

                                totalSum += Number(entr.total);

                                ctx.totalOfAllForms = totalSum;
                                ctx.loadPartials({
                                    header: './templates/common/header.hbs',
                                    footer: './templates/common/footer.hbs',
                                    navigation: './templates/common/navigation.hbs',
                                    entry: './templates/entries/entry.hbs',
                                    createColumnForm: './templates/forms/createColumnForm.hbs',
                                    createReceiptForm: './templates/forms/createReceiptForm.hbs',
                                }).then(function () {
                                    this.partial('./templates/views/homeView.hbs');
                                })

                            })

                        })


                })




        });

        this.get('#/', (ctx) => {
            ctx.redirect('#/home')
        })

        this.post('#/home', (ctx) => {

            if (!auth.isAuth()) {
                ctx.redirect('#index.html');
                return;
            }

            let form = ctx.target.id;
            if (form === 'create-entry-form') {
                

                let username = sessionStorage.getItem('username');
                let qty = ctx.params.qty;
                let type = ctx.params.type;
                let price = ctx.params.price;

                
                if (type === '') {
                    notify.showError('Name must be a non empty string !');
                    return;
                }
                
                if (qty.length === 0 ||  isNaN(Number(qty.toString()))) {
                    
                    notify.showError('Quantity should be a number !');
                    return;
                }

                
                if( price.length === 0 || isNaN(Number(price.toString())))
                {
                    notify.showError('Price should be a number !');
                    return;
                }
                
                qty = Number(ctx.params.qty);
                price = Number(ctx.params.price)

                let receiptId = localStorage.getItem('receiptId');
                entryService.addEntry(receiptId, type, qty, price)
                    .then((entry) => {
                        notify.showInfo('Entry added !');
                        ctx.redirect('#/home');
                    });                

            }
            else {
                
                let productCount = $('.row').length - 1;
    
                if(productCount < 1)
                {
                    notify.showError('Receipt should not be empty!')
                    return;
                }

                let total  = $($('#create-receipt-form').find('.col'))[3].textContent;
                let receipt_id = localStorage.getItem('receiptId')
                let userId = sessionStorage.getItem('userId');
              

                receiptService.commitReceipt(receipt_id, userId,  'false', productCount, total)
                    .then(function(){
                        notify.showInfo('Receipt checked out')
                        ctx.redirect('#/home');
                    })

            }

            
        });

        this.get('#/delete/:entryId', (ctx) => {
            
            if (!auth.isAuth()) {
                ctx.redirect('index.html');
                return;
            }
            
            let entryId = ctx.params.entryId;

            entryService.deleteEntry(entryId)
                .then(() => {
                    notify.showInfo('Entry removed.');
                    ctx.redirect('#/home');
                })
                .catch(notify.handleError);

        });
        
        this.get('#/overview', (ctx) => {


            if (!auth.isAuth()) {
                ctx.redirect('index.html');
                return;
            }
            
            ctx.username = sessionStorage.getItem('username');

            receiptService.getAllMyNonActiveReceipts()
                .then((recepts) => {

                    ctx.recepts = recepts

                    if(recepts.length === 0)
                    {
                        ctx.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs',
                            navigation: './templates/common/navigation.hbs',
                            receiptInfo: './templates/receipt/receiptInfo.hbs',
                        }).then(function () {
                            this.partial('./templates/views/overviewView.hbs');
                        })
                    }


                    recepts.forEach((receiptInfo, i) => {
                        
                        ctx.rec = receiptInfo;

                        let date = receiptInfo._kmd.ect.toString().slice(0, 10)
                        let time = receiptInfo._kmd.ect.toString()
                            .slice(11)
                            .slice(0,5);
                        
                        receiptInfo.date = date + ' ' + time

                        ctx.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs',
                            navigation: './templates/common/navigation.hbs',
                            receiptInfo: './templates/receipt/receiptInfo.hbs',
                        }).then(function () {
                            this.partial('./templates/views/overviewView.hbs');
                        })
                    })


                   
                })

        });
   
        this.get('#/details/:receiptId', (ctx) => {


            if (!auth.isAuth()) {
                ctx.redirect('index.html');
                return;
            }


            ctx.username = sessionStorage.getItem('username');

            let receiptId = ctx.params.receiptId;
            
            entryService.getEntriesReceiptById(receiptId)
             .then((entries) => {

                ctx.entries = entries

                entries.forEach((ent, i) => {
                    ent.total = ent.price * ent.quantity;
                }) 


                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    navigation: './templates/common/navigation.hbs',
                    entryDetails : '../templates/entries/entryDetails.hbs',
                }).then(function () {
                    this.partial('../templates/views/detailsView.hbs');
                })

             })




        })
     
    });

    app.run();
});