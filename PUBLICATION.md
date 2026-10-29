# Publication du Soco Chico

Visite issue des fichiers existants, sans changement du modèle architectural.

Départ : START_BAB_LEMDINA_EXTERIEUR. Interface français, arabe et espagnol ; paramètres ?lang=fr, ?lang=ar et ?lang=es.

Le workflow .github/workflows/pages.yml reconstitue le GLB à partir de blocs gzip de transport si nécessaire. deployment/restore_model.py vérifie chaque bloc puis l’empreinte SHA-256 du GLB. Ce processus restitue les mêmes octets ; il ne remodélise et ne réexporte rien. Le workflow conserve ensuite assets/soco_chico.glb dans le dépôt et publie seulement les fichiers Web, assets et vendor via GitHub Pages.

Dans Settings > Pages, la source doit être GitHub Actions si l’activation automatique n’est pas autorisée. Aucun secret personnel n’est nécessaire au workflow : il utilise le GITHUB_TOKEN éphémère du dépôt.

Three.js 0.180.0 est inclus avec sa licence MIT. Les photographies de référence sont fournies pour le projet. Les sources historiques figurent dans les fiches ; les proportions et shaders approximés ne constituent pas un relevé architectural certifié.

Les originaux Blender ne sont pas publiés et restent inchangés.
