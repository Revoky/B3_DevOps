    const { PrismaClient } = require('@prisma/client');
    const { faker } = require('@faker-js/faker');
    const prisma = new PrismaClient(); // Supprimé refreshToken qui n'est pas utilisé ici
    const createdSwipes = new Set(); // Reste global pour les swipes


    async function main() {
        const users = [];

        // 1. Créer 20 utilisateurs avec préférences (avec gestion des doublons d'usernames)
        for (let i = 0; i < 20; i++) {
            let userCreated = false;
            let attempts = 0;
            const MAX_ATTEMPTS = 5;

            while (!userCreated && attempts < MAX_ATTEMPTS) {
                try {
                    const username = faker.internet.userName();
                    const user = await prisma.user.create({
                        data: {
                            username: username,
                            firstname: faker.person.firstName(),
                            lastname: faker.person.lastName(),
                            email: faker.internet.email(),
                            password: faker.internet.password(),
                            age: faker.number.int({ min: 18, max: 80 }),
                            city: faker.location.city(),
                            refreshToken: faker.string.uuid(),
                            role: faker.helpers.arrayElement(['user', 'admin']),
                            preference: {
                                create: {
                                    rangelocation: faker.number.int({ min: 10, max: 100 }),
                                    agemin: faker.number.int({ min: 18, max: 25 }),
                                    agemax: faker.number.int({ min: 26, max: 40 }),
                                    typerelations: faker.helpers.arrayElements(['Sérieuse', 'Amicale', 'Sans lendemain'], { min: 1, max: 3 }),
                                    orientation: faker.helpers.arrayElement(['Hétéro', 'Homo', 'Bi']),
                                    humour: faker.helpers.arrayElements(['Noir', 'Ironique', 'Dérision', 'Second degré'], { min: 1, max: 3 })
                                }
                            }
                        }
                    });
                    users.push(user);
                    userCreated = true;
                } catch (e) {
                    if (e.code === 'P2002' && e.meta?.target?.includes('username')) {
                        console.warn(`Nom d'utilisateur généré en double, tentative de re-génération (${attempts + 1}/${MAX_ATTEMPTS}).`);
                        attempts++;
                    } else {
                        console.error('Erreur inattendue lors de la création d\'un utilisateur :', e);
                        throw e;
                    }
                }
            }
            if (!userCreated) {
                console.error('Impossible de créer un utilisateur unique après plusieurs tentatives.');
                // Optionnel: process.exit(1); si vous voulez que le seed échoue complètement ici.
            }
        }

        // 2. Créer les questions personnalisées
        const customQuestions = [
            "Si ta vie était un film, quel serait son titre ?",
            "Quel super-pouvoir un peu nul aimerais-tu avoir?",
            "La musique honteuse que tu adores écouter en boucle ?",
            "Quel est le proverbe qui résume ta personnalité ?",
            "Ta meilleure punchline pour briser la glace ?",
            "Dans quel univers imaginaire aimerais-tu vivre (film, série, jeu vidéo…) ?",
            "Tu es coincé dans une série télé : laquelle, et quel est ton rôle ?",
            "Un fantôme vient te hanter… mais il est nul. Que fait-il pour te hanter ?",
            "Quelle phrase te ferait swipe à gauche direct ?",
            "Ton enfance résumée en trois objets ?",
            "Si tu devais adopter un animal imaginaire, lequel et pourquoi ?",
            "Si tu pouvais envoyer un message vocal à ton “toi du futur”, tu dirais quoi ?",
            "Ton pseudo de rappeur ultra kitsch ?",
            "Crée une règle étrange que tout le monde devrait suivre sur Terre.",
            "La chose la plus simple qui peut te mettre de bonne humeur instantanément ?",
            "Ton excuse bidon préférée pour annuler un plan à la dernière minute ?",
            "Tu échanges ta vie avec un animal pendant 24h : lequel et que fais-tu ?",
            "Ecris un discours très solennel... mais sur un sujet ridicule.",
            "Un extraterrestre atterit dans ton jardin. Quelle est la première phrase que tu lui dis ?",
            "Tu préfères vivre dans un monde sans sarcasme ou dans un monde où tout est ironique ?"
        ];

        const questions = [];
        for (const questionText of customQuestions) {
            const question = await prisma.question.create({
                data: {
                    content: questionText
                }
            });
            questions.push(question);
        }

        // 3. Créer les défis
        const challenges = [
            "Quelle chanson définit le mieux nos vies amoureuses et pourquoi ?",
            "Nous sommes deux espions en mission. Échangeons quelques messages en langage codé.",
            "Décrivons notre premier rendez-vous durant une apocalypse zombie.",
            "Nous ne pouvons parler qu’en citations de films pendant 2 minutes.",
            "Décrivons-nous comme si nous étions un plat gastronomique.",
            "Quelle serait notre règle d’or si nous fondions notre propre pays ?",
            "Racontons une anecdote totalement fausse mais crédible.",
            "Nous sommes dans une comédie musicale, écrivons la chanson de notre rencontre.",
            "Organisons ensemble le plan d’un braquage de banque.",
            "Écrivons ensemble une mauvaise chanson d’amour en nous répondant couplet par couplet.",
            "Improvisons une histoire : nous nous envoyons chacun une phrase à tour de rôle.",
            "Faisons un concours du pire jeu de mots.",
            "Écrivons une scène de rupture ultra dramatique, avec une réconciliation façon télénovela.",
            "Quels sont nos signes astrologiques ? Écrivons un faux horoscope pour l’autre.",
            "Faisons un duel d’emoji : qui trouve les meilleurs pour exprimer “un lundi matin sans café” ?",
            "Faisons un concours de qui peut écrire le message le plus dramatique pour annoncer qu’il a mangé le dernier cookie.",
            "Faisons un Top 3 des pires prénoms qu’on pourrait donner à nos futurs enfants.",
            "Faisons deviner à l’autre notre passion en utilisant uniquement des emojis.",
            "Écrivons un acrostiche avec le prénom de l’autre pour le complimenter.",
            "Echangeons quelques message comme si nous vivions au 19e siècle."
        ];

        for (const challengeText of challenges) {
            await prisma.challenge.create({
                data: {
                    content: challengeText
                }
            });
        }

        // 4. Créer des matchs (sans doublons robustes)
        const matches = [];
        const createdMatchPairs = new Set(); 

        for (let i = 0; i < 50; i++) { 
            if (users.length < 2) continue; 

            const [u1, u2] = faker.helpers.shuffle(users).slice(0, 2);
            
            if (u1.id === u2.id) continue;

            const userAId = Math.min(u1.id, u2.id);
            const userBId = Math.max(u1.id, u2.id);

            const matchKey = `${userAId}-${userBId}`;

            if (createdMatchPairs.has(matchKey)) {
                continue; 
            }

            try {
                const match = await prisma.match.create({
                    data: {
                        iduser1: userAId, 
                        iduser2: userBId
                    }
                });
                matches.push(match);
                createdMatchPairs.add(matchKey); 
                if (matches.length >= 15) break; 
            } catch (e) {
                if (e.code === 'P2002') {
                    createdMatchPairs.add(matchKey); 
                } else {
                    console.error('Erreur inattendue lors de la création d\'un match:', e);
                    throw e; 
                }
            }
        }

        // 5. Messages pour chaque match
        for (const match of matches) {
            const participants = [match.iduser1, match.iduser2];
            const nbMessages = faker.number.int({ min: 15, max: 30 });

            for (let i = 0; i < nbMessages; i++) {
                await prisma.message.create({
                    data: {
                        idmatch: match.id,
                        senderid: faker.helpers.arrayElement(participants),
                        content: faker.lorem.sentence(),
                        timestamp: faker.date.recent({ days: 30 })
                    }
                });
            }
        }

        // 6. Créer des swipes aléatoires (sans doublons)
        for (const swiper of users) {
            const swipeCount = faker.number.int({ min: 5, max: 10 });

            const others = users.filter(u => u.id !== swiper.id);
            const shuffled = faker.helpers.shuffle(others);

            for (let i = 0; i < swipeCount; i++) {
                const swiped = shuffled[i];

                const swipeKey = `${swiper.id}-${swiped.id}`;
                if (createdSwipes.has(swipeKey)) continue;

                try {
                    await prisma.swipe.create({
                        data: {
                            iduser1: swiper.id,
                            iduser2: swiped.id,
                            liked: faker.datatype.boolean({ probability: 0.7 })
                        }
                    });
                    createdSwipes.add(swipeKey);
                } catch (e) {
                    if (e.code === 'P2002') {
                        createdSwipes.add(swipeKey); 
                    } else {
                        console.error('Erreur inattendue lors de la création d\'un swipe:', e);
                        throw e;
                    }
                }
            }
        }

        console.log('✔️ Base de données remplie avec succès !');
    }

    main()
        .catch(e => {
            console.error('❌ Erreur dans le seed :', e);
            process.exit(1);
        })
        .finally(() => prisma.$disconnect());