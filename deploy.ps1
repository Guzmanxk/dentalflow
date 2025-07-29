git init
```

### **2. Adicionar arquivos:**
```bash
git add .
```

### **3. Fazer primeiro commit:**
```bash
<code_block_to_apply_changes_from>
```

### **4. Criar repositório no GitHub:**
1. **Acesse:** https://github.com/new
2. **Nome do repositório:** `dentaflow`
3. **Descrição:** `Sistema de gestão para clínicas odontológicas`
4. **Deixe público**
5. **NÃO** marque "Add a README file"
6. **Clique em "Create repository"**

### **5. Conectar com GitHub:**
```bash
git remote add origin https://github.com/SEU_USUARIO/dentaflow.git
```
(Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub)

### **6. Enviar para GitHub:**
```bash
git branch -M main
git push -u origin main
```

## 🎯 **Depois que estiver no GitHub:**

1. **Acesse:** https://vercel.com/new
2. **Clique em "Import Git Repository"**
3. **Selecione seu repositório `dentaflow`**
4. **Configure as variáveis de ambiente**
5. **Deploy!**

**Execute o primeiro comando `git init` e me diga se funcionou!** 🚀