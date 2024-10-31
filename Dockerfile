# Stage de build - avec npm
FROM alpine:3.15 AS builder

WORKDIR /build
RUN apk add --no-cache nodejs npm

COPY package*.json ./
RUN npm ci --only=production

# Stage de production - sans npm
FROM alpine:3.15

# Installation de node uniquement (pas npm)
RUN apk add --no-cache nodejs

# Création de l'utilisateur
RUN addgroup -S nodegroup && \
    adduser -S nodeuser -G nodegroup

WORKDIR /app

# Copie des fichiers compilés et des dépendances
COPY --from=builder /build/node_modules ./node_modules
COPY --chown=nodeuser:nodegroup dist/ ./dist/

# Downgrade des privilèges
USER nodeuser

# Exécution directe avec node (sans npm)
CMD ["node", "dist/index.js"]